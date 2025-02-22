import nodemailer from 'nodemailer';
import cron from 'node-cron';
import { MongoClient, ObjectId } from 'mongodb';
import mongoose from 'mongoose';

class NotificationService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    this.initCronJob();
  }

  initCronJob() {
    cron.schedule('*/2 * * * *', async () => {
      console.log('⏰ Cron job triggered at:', new Date().toLocaleString());
      try {
        await this.checkAndNotify();
      } catch (error) {
        console.error('❌ Error in cron job:', error);
      }
    });
    console.log('🚀 Notification service initialized with 2-minute schedule');
  }

  generateEmailHTML(user, subscriptions) {
    const totalAmount = subscriptions.reduce((sum, sub) => sum + sub.amount, 0);
    const subscriptionList = subscriptions
      .map(
        (sub) => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${sub.serviceName}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">$${sub.amount.toFixed(2)}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${new Date(sub.nextPaymentDate).toLocaleDateString()}</td>
        </tr>
      `
      )
      .join('');

    return `
      <h2>Upcoming Subscription Payments</h2>
      <p>Hello ${user.name},</p>
      <p>You have ${subscriptions.length} subscription${subscriptions.length > 1 ? 's' : ''} due for payment in 3 days:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="background-color: #f8f9fa;">
            <th style="padding: 10px; text-align: left;">Service</th>
            <th style="padding: 10px; text-align: left;">Amount</th>
            <th style="padding: 10px; text-align: left;">Due Date</th>
          </tr>
        </thead>
        <tbody>
          ${subscriptionList}
        </tbody>
        <tfoot>
          <tr style="font-weight: bold; background-color: #f8f9fa;">
            <td style="padding: 10px;">Total</td>
            <td style="padding: 10px;" colspan="2">$${totalAmount.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
      
      <p>Please ensure you have sufficient funds available for these payments.</p>
      <p><a href="https://yourapp.com/subscriptions">View All Subscriptions</a></p>
    `;
  }

  async sendEmail(user, subscriptions) {
    try {
      const result = await this.transporter.sendMail({
        from: '"Armadollar Saver" <garrettlchow@gmail.com>',
        to: user.email,
        subject: `${subscriptions.length} Subscription${subscriptions.length > 1 ? 's' : ''} Due in 3 Days`,
        html: this.generateEmailHTML(user, subscriptions),
      });

      console.log(
        `✉️ Email sent to ${user.email} for ${subscriptions.length} subscriptions`
      );
      return result;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  async checkAndNotify() {
    console.log(
      '🔍 Starting notification check at:',
      new Date().toLocaleString()
    );

    try {
      const db = mongoose.connection.db;

      const threeDaysFromNow = new Date();
      threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
      threeDaysFromNow.setHours(0, 0, 0, 0);

      const endOfDay = new Date(threeDaysFromNow);
      endOfDay.setHours(23, 59, 59, 999);

      const subscriptions = await db
        .collection('test-subscriptions')
        .find({
          status: 'active',
          nextPaymentDate: {
            $gte: threeDaysFromNow,
            $lt: endOfDay,
          },
        })
        .toArray();

      console.log(
        `📊 Found ${subscriptions.length} subscriptions due for notification`
      );

      const subscriptionsByUser = subscriptions.reduce((acc, subscription) => {
        const userIdString = subscription.userId.toString();
        if (!acc[userIdString]) {
          acc[userIdString] = [];
        }
        acc[userIdString].push(subscription);
        return acc;
      }, {});

      for (const [userId, userSubscriptions] of Object.entries(
        subscriptionsByUser
      )) {
        const user = await db.collection('test-users').findOne({
          _id: new ObjectId(userId),
        });

        if (user) {
          console.log(`👤 Processing notifications for user: ${user.name}`);
          await this.sendEmail(user, userSubscriptions);

          // Calculate next payment date (30 days from current nextPaymentDate)
          const subscriptionIds = userSubscriptions.map((sub) => sub._id);
          await db.collection('test-subscriptions').updateMany(
            { _id: { $in: subscriptionIds } },
            {
              $set: {
                nextPaymentDate: new Date(
                  threeDaysFromNow.getTime() + 30 * 24 * 60 * 60 * 1000
                ),
                updatedAt: new Date(),
              },
            }
          );

          await db.collection('notification-logs').insertOne({
            userId: user._id,
            subscriptionIds: subscriptionIds,
            type: 'payment_reminder',
            subscriptionCount: userSubscriptions.length,
            totalAmount: userSubscriptions.reduce(
              (sum, sub) => sum + sub.amount,
              0
            ),
            sentAt: new Date(),
          });
        }
      }

      console.log('✅ Notification check completed successfully');
    } catch (error) {
      console.error('❌ Error in notification service:', error);
      throw error;
    }
  }
}

const notificationService = new NotificationService();
export default notificationService;
