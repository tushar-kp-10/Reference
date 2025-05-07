// import mongoose from "mongoose";

// const connectDB = async () => {

//     mongoose.connection.on('connected',()=>{
//         console.log("DB Connected");
        
//     })

//     await mongoose.connect(`mongodb+srv://tutulmimosa:z1Ky70HKNXtH4I2i@cluster0.8xdvdh7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
//     // await mongoose.connect(`${process.env.MONGODB_URI}/forever`)
    
// }

// export default connectDB ;



import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://tutulmimosa:45IB5JY6BLxCsdtT@cluster0.5fjoqiz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("✅ MongoDB connected successfully");
        
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1); // Exit the process if DB connection fails
    }

    mongoose.connection.on("disconnected", () => {
        console.log("⚠️ MongoDB disconnected");
    });
};

export default connectDB;
