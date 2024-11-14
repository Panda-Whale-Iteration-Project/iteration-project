import { MongoClient, ObjectId } from 'mongodb';

const generateSampleData = () => {
  // Generate consistent ObjectIds for testing
  const userIds = Array(6)
    .fill()
    .map(() => new ObjectId());
  const subscriptionIds = Array(18)
    .fill()
    .map(() => new ObjectId());

  const users = [
    // Your test user first
    {
      _id: userIds[0],
      name: 'Garrett Chow',
      email: 'chowg@uci.edu',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // Rest of the sample users
    ...userIds.slice(1).map((userId, index) => ({
      _id: userId,
      name: `User ${index + 1}`,
      email: `user${index + 1}@example.com`,
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
  ];

  const services = [
    { name: 'Netflix', category: 'entertainment', basePrice: 15.99 },
    { name: 'Spotify', category: 'entertainment', basePrice: 9.99 },
    { name: 'Amazon Prime', category: 'entertainment', basePrice: 14.99 },
    { name: 'GitHub', category: 'productivity', basePrice: 7.99 },
    {
      name: 'Adobe Creative Cloud',
      category: 'productivity',
      basePrice: 52.99,
    },
    { name: 'Microsoft 365', category: 'productivity', basePrice: 6.99 },
    { name: 'AWS', category: 'utilities', basePrice: 29.99 },
  ];

  // Get date for 3 days from now
  const today = new Date();
  const threeDaysFromNow = new Date();
  threeDaysFromNow.setDate(today.getDate() + 3);
  // Set to beginning of the day
  threeDaysFromNow.setHours(0, 0, 0, 0);

  const subscriptions = subscriptionIds.map((subId, index) => {
    const service = services[index % services.length];
    const userId = userIds[Math.floor(index / 3)];

    const lastPaymentDate = new Date(threeDaysFromNow);
    lastPaymentDate.setMonth(lastPaymentDate.getMonth() - 1);

    return {
      _id: subId,
      userId: userId,
      serviceName: service.name,
      amount: service.basePrice,
      status: 'active',
      billingCycle: 'monthly',
      nextPaymentDate: threeDaysFromNow,
      category: service.category,
      notifyDaysBefore: 3,
      createdAt: new Date(lastPaymentDate),
      updatedAt: new Date(),
    };
  });

  return { users, subscriptions };
};

async function insertSampleData() {
  const uri =
    'mongodb+srv://r1mohamm:STz29egofuzuI3bC@armadollardb.0zmng.mongodb.net/?retryWrites=true&w=majority&appName=ArmaDollarDB';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    const { users, subscriptions } = generateSampleData();

    // Clear existing data
    await db.collection('test-users').deleteMany({});
    await db.collection('test-subscriptions').deleteMany({});

    // Insert new data
    await db.collection('test-users').insertMany(users);
    await db.collection('test-subscriptions').insertMany(subscriptions);

    console.log('Sample data inserted successfully');

    // Print test data summary
    console.log('\nTest Data Summary:');
    console.log(`Total Users: ${users.length}`);
    console.log(`Total Subscriptions: ${subscriptions.length}`);

    // Print test user's subscriptions
    const testUserSubs = subscriptions.filter(
      (sub) => sub.userId.toString() === users[0]._id.toString()
    );
    console.log('\nTest User Subscriptions:');
    testUserSubs.forEach((sub) => {
      console.log(
        `- ${sub.serviceName}: $${sub.amount} (due: ${sub.nextPaymentDate.toLocaleDateString()})`
      );
    });
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
  }
}

insertSampleData().catch(console.error);
