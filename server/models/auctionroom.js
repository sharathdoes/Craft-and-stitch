const mongoose = require('mongoose');


const auctionRoomSchema = new mongoose.Schema({
    designId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Design',
        required: true
    },
    designerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Designer',
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'closed'],
        default: 'active'
    },
    users: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'SourceManager',
        },
      ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const AuctionRoom = mongoose.model('AuctionRoom', auctionRoomSchema);
module.exports = AuctionRoom;