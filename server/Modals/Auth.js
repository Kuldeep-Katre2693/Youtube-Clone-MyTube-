import mongoose from "mongoose";

const userschema = mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String },
  channelname: { type: String },
  description: { type: String },
  image: { type: String },
  joinedon: { type: Date, default: Date.now },

  plan: {
  type: String,
  enum: ["free", "bronze", "silver", "gold"],
  default: "free",
},

theme: {
  type: String,
  enum: ["light", "dark"],
  default: "dark",
},

 paymentId: { type: String },
  orderId: { type: String },
  subscriptionDate: { type: Date },
  
});

export default mongoose.model("user", userschema);
