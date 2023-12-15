import mongoose from "mongoose";

const connectDB = async () => {
   const conn = await mongoose.connect(
    "mongodb+srv://aarifsolankey:3rcOOTPWrm5j1sc1@cluster0.vpnjy0x.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  
  console.log("Host----", conn.connection.host);
};

export default connectDB;
