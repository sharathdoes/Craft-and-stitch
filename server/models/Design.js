const mongoose = require('mongoose');


const designSchema = new mongoose.Schema(
    {
      designerId: {
        type: types.ObjectId,
        ref: 'Designer',
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      pdfLink: {
        type: String,
        required: true,
      },
      thumbnail: {
        type: String,
      },
      auctionStarted: {
        type: Boolean,
        default: false,
      },
      auctionEnded: {
        type: Boolean,
        default: false,
      },
      sold: {
        type: Boolean,
        default: false,
      },
      soldAt: {
        type: Date,
      },
      purchasedBy: {
        type: types.ObjectId,
        ref: 'SourceManager',
      },
    },
    { timestamps: true }
  );
  

const Design = mongoose.model('Design', designSchema);
module.exports = Design;