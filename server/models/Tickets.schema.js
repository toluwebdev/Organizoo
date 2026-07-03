import mongoose from "mongoose";
const ticketSchema = new mongoose.Schema({
    // References
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ticketTierId: { type: mongoose.Schema.Types.ObjectId, required: true },
    paymentId: { type: mongoose.Schema.Types.ObjectId, ref: "Payment", required: true },
    // Ticket Details 
    ticketType: { type: String, required: true },
    ticketNumber: { type: String, required: true, unique: true },
    quantity: { type: Number, default: 1, required: true },
    // Validation 
    qrCode: { type: String, required: true, unique: true },
})