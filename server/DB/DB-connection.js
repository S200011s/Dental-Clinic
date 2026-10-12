// import mongoose from "mongoose";

// let isConnected = false;

// const db_connection = async () => {
//   if (isConnected) return;

//   const uri = process.env.atlas_URL;
//   if (!uri) {
//     throw new Error("MongoDB connection string is missing in environment variables.");
//   }

//   try {
//     console.log("🧪 Connecting to Mongo URI:", uri);
//     await mongoose.connect(uri);
//     mongoose.connection.once("open", () => {
//         console.log("Connected to DB:", mongoose.connection.name);
//     });

//     isConnected = true;
//     console.log("MongoDB connected successfully");
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//   }
// };

// export default db_connection;

import mongoose from "mongoose";

// Cached promise — shared across invocations in the same lambda
let connectPromise = null;

const db_connection = async () => {
  // Already connected (warm instance)
  if (mongoose.connection.readyState === 1) return;

  // A connect is already in flight — wait for it
  if (connectPromise) return connectPromise;

  const uri = process.env.atlas_URL;
  if (!uri) throw new Error("MongoDB connection string is missing.");

  console.log("🧪 Connecting to MongoDB...");
  connectPromise = mongoose
    .connect(uri, {
      serverSelectionTimeoutMS: 8000,   // fail fast, don't buffer for 30s
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    })
    .then(() => {
      console.log("✅ MongoDB connected:", mongoose.connection.name);
    })
    .catch((err) => {
      console.error("❌ MongoDB connection error:", err.message);
      connectPromise = null;             // allow retry on next request
      throw err;                          // IMPORTANT: rethrow so caller knows
    });

  return connectPromise;
};

export default db_connection;