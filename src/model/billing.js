const mongoose = require("mongoose");
const BillingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      // required: true
    },
    phone: {
      type: String,
      // required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Billing", BillingSchema);
