import mongoose from "mongoose"

const volunteerApplicationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },
    qrCode: {
        type: String,   // base64 data URI — generated on application
        default: null
    }
}, { timestamps: true })

// One application per user per event
volunteerApplicationSchema.index({ userId: 1, eventId: 1 }, { unique: true })

const VolunteerApplication = mongoose.model("VolunteerApplication", volunteerApplicationSchema)

export default VolunteerApplication
