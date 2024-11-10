// test-notifications.js
import { MongoClient } from 'mongodb';
import NotificationService from '../server/notifs.js';
import dotenv from 'dotenv';

dotenv.config();

async function testNotificationSystem() {
  const uri =
    'mongodb+srv://PinkFairyArmadillo:F5E0BmkMuHIFFhas@armadollar-saver.70puj.mongodb.net/';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db();

    // Create a test version of NotificationService with a mock email transporter
    class TestNotificationService extends NotificationService {
      constructor() {
        super();
        // Override the email transporter with a test version
        this.transporter = {
          sendMail: async (mailOptions) => {
            console.log('\n📧 Email Notification Summary:');
            console.log('To:', mailOptions.to);
            console.log('Subject:', mailOptions.subject);

            // Extract subscription count from subject
            const count = mailOptions.subject.match(/(\d+)/)[1];
            console.log(
              `Contains ${count} subscription${count > 1 ? 's' : ''}`
            );

            // Extract total amount from HTML
            const totalMatch = mailOptions.html.match(
              /Total<\/td>\s*<td[^>]*>\$([^<]+)/
            );
            if (totalMatch) {
              console.log('Total Amount: $' + totalMatch[1]);
            }

            return { accepted: [mailOptions.to] };
          },
        };
      }
    }

    const notificationService = new TestNotificationService();

    // Test the scheduled check and notify function
    console.log('\nTesting checkAndNotify function:');
    try {
      await notificationService.checkAndNotify();
      console.log('✓ checkAndNotify completed successfully');
    } catch (error) {
      console.error('✗ Error in checkAndNotify:', error);
    }
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await client.close();
    console.log('\nTest completed and database connection closed');
  }
}

// Run the test
testNotificationSystem().catch(console.error);
