const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: String,
    // required: true
  },
  price: {
      type: String,
      required: true
  },
  description: {
      type: String,
      required: true
  },
  offer: {
      type: Number,
  },
  images: [
    {
      public_id: {
        type: String,
        // required: true,
      },
      url: {
        type: String,
        // required: true,
      },
    },
  ],
  reviews: [
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        },
        name: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    }
],
  category: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Category',
    required: true
  },
  // createdBy:{
  //   type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
  // },
  updateAt: Date
}, {timestamps: true});

module.exports = mongoose.model("Product", productSchema);
