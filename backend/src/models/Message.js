const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema(
    {

        message: {
            type: String,
        },

        srcUserId: {
            type: String,
            required: true,
        },

        dstUserId: {
            type: String,
            required: true,
        },

    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = mongoose.model("Message", messageSchema);