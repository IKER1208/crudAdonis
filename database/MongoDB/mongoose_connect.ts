import mongoose from 'mongoose';

const mongoUri = 'mongodb+srv://admin:admin@myatlasclusteredu.oh7cbmy.mongodb.net/';

mongoose.connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err: Error) => {
    console.error('MongoDB connection error:', err);
  });

export default mongoose;