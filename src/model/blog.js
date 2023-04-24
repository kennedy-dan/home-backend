const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    images: {
      type: Object,
      // required: true,
    },

    post: { type: mongoose.Schema.Types.Mixed },
    date: { type: Date, default: Date.now },
  }
  // { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
