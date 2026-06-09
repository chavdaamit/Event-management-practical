import express from "express";

import uploads from "../middleware/upload.js";
import eventControllers from "../controllers/event_managment.js";

const router = express.Router();

router.post(
  "/create",
  uploads.fields([
    { name: "eventImages", maxCount: 5 },
    { name: "eventPoster", maxCount: 1 },
    {
      name: "eventBanner",
      maxCount: 1,
    },
    {
      name: "eventSpeakers",
      maxCount: 3,
    },
    {
      name: "eventDocuments",
      maxCount: 3,
    },
  ]),
  eventControllers.create,
);

router.get("/allEvents", eventControllers.getAllEvents);
router.delete("/:id", eventControllers.deleteEvent);
router.get("/:id", eventControllers.eventByid);
router.patch(
  "/:id",
  uploads.fields([
    { name: "eventImages", maxCount: 5 },
    { name: "eventPoster", maxCount: 1 },
    {
      name: "eventBanner",
      maxCount: 1,
    },
    {
      name: "eventSpeakers",
      maxCount: 3,
    },
    {
      name: "eventDocuments",
      maxCount: 3,
    },
  ]),
  eventControllers.updateEvent,
);

export default router;
