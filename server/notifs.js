// notifications.js
import nodemailer from 'nodemailer';
import cron from 'node-cron';

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
  }

  async sendEmail(user, subscription) {
    const daysUntilDue = this.calculateDaysUntilDue(
      subscription.nextPaymentDate
    );

    return await this.transporter.sendMail({
      from: '"Subscription Manager" <notifications@yourapp.com>',
      to: user.email,
      subject: `Payment Due in ${daysUntilDue} Days`,
      html: `
        <h2>Payment Reminder</h2>
        <p>Hello ${user.name},</p>
        <p>Your subscription for ${subscription.serviceName} is due in ${daysUntilDue} days.</p>
        <p>Amount due: $${subscription.amount}</p>
        <p>Due date: ${subscription.nextPaymentDate}</p>
        <a href="https://yourapp.com/subscriptions/${subscription.id}">View Subscription</a>
      `,
    });
  }

  calculateDaysUntilDue(nextPaymentDate) {
    const now = new Date();
    const dueDate = new Date(nextPaymentDate);
    const diffTime = Math.abs(dueDate - now);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  // Function to check and send notifications
  async checkAndNotify() {
    try {
      // Get all active subscriptions with upcoming payments
      const subscriptions = await Subscription.findAll({
        where: {
          status: 'active',
          nextPaymentDate: {
            [Op.between]: [
              new Date(),
              new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next 7 days
            ],
          },
        },
        include: [
          {
            model: User,
            attributes: ['email', 'name', 'notificationPreferences'],
          },
        ],
      });

      // Send notifications for each subscription
      for (const subscription of subscriptions) {
        const daysUntilDue = this.calculateDaysUntilDue(
          subscription.nextPaymentDate
        );

        // Check user notification preferences
        if (
          this.shouldSendNotification(
            subscription.User.notificationPreferences,
            daysUntilDue
          )
        ) {
          await this.sendEmail(subscription.User, subscription);

          // Log notification
          await NotificationLog.create({
            userId: subscription.userId,
            subscriptionId: subscription.id,
            type: 'payment_reminder',
            sentAt: new Date(),
          });
        }
      }
    } catch (error) {
      console.error('Error in notification service:', error);
    }
  }

  shouldSendNotification(preferences, daysUntilDue) {
    // Example notification rules
    const defaultRules = [7, 3, 1]; // Days before payment
    const userRules = preferences?.reminderDays || defaultRules;
    return userRules.includes(daysUntilDue);
  }
}

// Schedule notification checks
const notificationService = new NotificationService();
cron.schedule('0 9 * * *', () => {
  // Run daily at 9 AM
  notificationService.checkAndNotify();
});

export default NotificationService;
