import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
      trim: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    eventDescription: {
      type: String,
    },
    eventImages: {
      type: [String],
    },
    eventPoster: {
      type: String,
      required: true,
    },
    eventBanner: {
      type: String,
    },
    eventSpeakers: {
      type: [String],
    },
    ticketPrice: {
      type: Number,
      required: true,
    },
    eventDocuments: {
      type: [String],
      required: true,
    },
    eventVenue: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Event = mongoose.model("Event", eventSchema);

export default Event;