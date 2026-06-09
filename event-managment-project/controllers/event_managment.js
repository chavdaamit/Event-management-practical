import HttpError from "../middleware/HttpError.js";

import Event from "../model/Event.js";

import fs from "fs";

const create = async (req, res, next) => {
  try {
    const { eventName, eventDate, eventDescription, ticketPrice, eventVenue } =
      req.body;

    const eventImages =
      req.files?.eventImages?.map((file) => file.path) || null;

    const eventPoster = req.files?.eventPoster[0]?.path || null;

    const eventBanner = req.files?.eventBanner[0]?.path || null;

    const eventSpeakers =
      req.files?.eventSpeakers?.map((file) => file.path) || null;

    const eventDocuments =
      req.files?.eventDocuments?.map((file) => file.path) || null;

    if (!eventDate) {
      return next(new HttpError("event date is required", 400));
    }

    const newEventData = await Event.create({
      eventName,
      eventDate,
      eventDescription,
      eventVenue,
      ticketPrice,
      eventImages,
      eventPoster,
      eventSpeakers,
      eventBanner,
      eventDocuments,
    });

    res.status(201).json({
      success: true,
      message: "new event added successfully",
      data: newEventData,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find({});

    if (events.length === 0) {
      return res
        .status(404)
        .json({ success: true, message: " no event data found", data: null });
    }

    res.status(200).json({
      success: true,
      message: "all event data fetched successfully",
      total: events.length,
      data: events,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const eventByid = async (req, res, next) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
      return next(new HttpError("no event data  found with this id", 404));
    }

    res
      .status(200)
      .json({ success: true, message: "event data found", data: event });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return next(new HttpError("failed to delete event", 404));
    }

    const filesToDelete = [
      ...(event.eventImages || []),
      ...(event.eventDocuments || []),
      ...(event.eventSpeakers || []),
      event.eventPoster,
      event.eventBanner,
    ].filter(Boolean);


    for (const file of filesToDelete) {
      try {
        if (fs.existsSync(file)) {
          fs.unlinkSync(file);
        }
      } catch (err) {
        console.log("Delete Error:", err.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: "event deleted successfully",
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};
const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
      return next(new HttpError("no event data found with this id", 404));
    }

    const updates = Object.keys(req.body);

    const allowedFields = [
      "eventName",
      "eventDate",
      "eventDescription",
      "eventVenue",
      "ticketPrice",
    ];

    const isValidUpdates = updates.every((field) =>
      allowedFields.includes(field),
    );

    if (!isValidUpdates) {
      return next(new HttpError("only allowed fields can be updated", 400));
    }

   
    if (req.files?.eventImages) {
      event.eventImages.forEach((file) => {
        if (fs.existsSync(file)) {
          fs.unlinkSync(file);
        }
      });

      event.eventImages = req.files.eventImages.map(
        (file) => file.path,
      );
    }

    if (req.files?.eventPoster) {
      if (event.eventPoster && fs.existsSync(event.eventPoster)) {
        fs.unlinkSync(event.eventPoster);
      }

      event.eventPoster = req.files.eventPoster[0].path;
    }

  
    if (req.files?.eventBanner) {
      if (event.eventBanner && fs.existsSync(event.eventBanner)) {
        fs.unlinkSync(event.eventBanner);
      }

      event.eventBanner = req.files.eventBanner[0].path;
    }

    if (req.files?.eventSpeakers) {
      event.eventSpeakers.forEach((file) => {
        if (fs.existsSync(file)) {
          fs.unlinkSync(file);
        }
      });

      event.eventSpeakers = req.files.eventSpeakers.map(
        (file) => file.path,
      );
    }

  
    if (req.files?.eventDocuments) {
      event.eventDocuments.forEach((file) => {
        if (fs.existsSync(file)) {
          fs.unlinkSync(file);
        }
      });

      event.eventDocuments = req.files.eventDocuments.map(
        (file) => file.path,
      );
    }

    updates.forEach((field) => {
      event[field] = req.body[field];
    });

    await event.save();

    res.status(200).json({
      success: true,
      message: "event data updated successfully",
      data: event,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

export default { create, getAllEvents, deleteEvent, updateEvent, eventByid };
