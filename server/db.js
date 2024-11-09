import mongoose from 'mongoose';

//db connection details

const connectDB = async () => {
  const MG_URI =
	'mongodb+srv://PinkFairyArmadillo:F5E0BmkMuHIFFhas@armadollar-saver.70puj.mongodb.net/';
  
  mongoose.connect(MG_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  mongoose.connection.once('open', () => {
    console.log('ArmaDollar Saver at your service!');
  });
}
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
