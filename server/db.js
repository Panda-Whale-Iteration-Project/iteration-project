import mongoose from 'mongoose';

//db connection details

const connectDB = async () => {
  const MG_URI =
    'mongodb+srv://r1mohamm:STz29egofuzuI3bC@armadollardb.0zmng.mongodb.net/?retryWrites=true&w=majority&appName=ArmaDollarDB';

  await mongoose.connect(MG_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.once('open', () => {
    console.log('ArmaDollar Saver at your service!');
  });
};
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected successfully');
//   } catch (error) {
//     console.error('MongoDB connection error:', error);
//     process.exit(1);
//   }
// };

export default connectDB;
