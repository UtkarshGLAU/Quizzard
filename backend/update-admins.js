import mongoose from "mongoose";
import User from "./models/User.model.js";
import dotenv from "dotenv";

dotenv.config();

async function updateAdmins() {
  try {
    await mongoose.connect(process.env.MONGODB_CONN);
    console.log("Connected to MongoDB");

    const adminEmails = process.env.ADMIN_EMAILS 
      ? process.env.ADMIN_EMAILS.split(",").map(e => e.trim())
      : [];

    console.log("Admin emails:", adminEmails);

    const result = await User.updateMany(
      { email: { $in: adminEmails } },
      { $set: { isAdmin: true } }
    );

    console.log("✅ Updated", result.modifiedCount, "users to admin status");
    console.log("Matched:", result.matchedCount, "users");

    // Show updated users
    const admins = await User.find({ email: { $in: adminEmails } });
    console.log("\nAdmin users:");
    admins.forEach(u => {
      console.log(`  - ${u.email}: isAdmin=${u.isAdmin}`);
    });

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
}

updateAdmins();
