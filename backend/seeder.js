import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
    try {
        // Clear all data
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
    
        // Insert users
        const createdUsers = await User.insertMany(users);
    
        // Get admin user
        const adminUser = createdUsers[0]._id;
    
        // Insert products
        const sampleProducts = products.map((product) => {
        return { ...product, user: adminUser };
        });
        await Product.insertMany(sampleProducts);
    
        console.log("Data imported!".green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1); // 1 = exit with failure
    }
};

const destroyData = async () => {
    try {
        // Clear all data
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
    
        console.log("Data destroyed!".red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1); // 1 = exit with failure
    }
};

// Run command: node backend/seeder -d
if (process.argv[2] === "-d") {
    destroyData();
}
else {
    importData();
}