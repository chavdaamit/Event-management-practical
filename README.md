# Event Management API

A RESTful API built with **Node.js**, **Express.js**, **MongoDB**, **Mongoose**, and **Multer** for managing events with file uploads.

## Features

* Create Event
* Get All Events
* Get Event By ID
* Update Event
* Delete Event
* Upload Multiple Files

  * Event Images
  * Event Poster
  * Event Banner
  * Event Speakers Images
  * Event Documents (PDF)
* Automatic File Deletion When Event Is Deleted
* Centralized Error Handling
* MongoDB Integration

---

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* Multer
* dotenv
* fs (File System)

---

## Project Structure

```bash
project/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── event_managment.js
│
├── middleware/
│   ├── HttpError.js
│   └── upload.js
│
├── model/
│   └── Event.js
│
├── routes/
│   └── eventRoutes.js
│
├── uploads/
│   ├── eventImages/
│   ├── eventPoster/
│   ├── eventBanner/
│   ├── eventSpeakers/
│   └── eventDocuments/
│
├── .env
├── server.js
└── package.json
```


### Create Event

```http
POST /event/create
```

#### Form Data

| Field            | Type   |
| ---------------- | ------ |
| eventName        | String |
| eventDate        | Date   |
| eventDescription | String |
| eventVenue       | String |
| ticketPrice      | Number |
| eventImages      | File[] |
| eventPoster      | File   |
| eventBanner      | File   |
| eventSpeakers    | File[] |
| eventDocuments   | PDF[]  |

---

### ADD Event
<img width="1753" height="1062" alt="image" src="https://github.com/user-attachments/assets/30a352d5-dda7-41ef-8ee9-4cef4f9efe1f" />


### Get All Events
<img width="1847" height="1113" alt="image" src="https://github.com/user-attachments/assets/c33316b3-9790-4354-ac4b-400fb881915b" />


### Get Event By ID
<img width="1799" height="1028" alt="image" src="https://github.com/user-attachments/assets/bfc1fa50-9c4f-48a2-bc05-f6bb1956a855" />


### Update Event

<img width="1769" height="1114" alt="image" src="https://github.com/user-attachments/assets/46783021-efcf-4634-8a9b-eeb9c624e63c" />


Supports updating both text fields and uploaded files.

---

### Delete Event

<img width="1689" height="1109" alt="image" src="https://github.com/user-attachments/assets/490a0c62-7ac8-43cf-80ec-25faf46a19c1" />



Automatically removes all uploaded files from the server.



## Event Schema

```javascript
{
  eventName: String,
  eventDate: Date,
  eventDescription: String,
  eventImages: [String],
  eventPoster: String,
  eventBanner: String,
  eventSpeakers: [String],
  ticketPrice: Number,
  eventDocuments: [String],
  eventVenue: String
}
```

---

## File Upload Validation

### Allowed Image Formats

```text
jpg
jpeg
png
```

### Allowed Document Format

```text
pdf
```

### Maximum File Size

```text
5 MB
```

---

## Success Response Example

```json
{
  "success": true,
  "message": "new event added successfully",
  "data": {}
}
```

---

## Error Response Example

```json
{
  "message": "something went wrong try again"
}
```

---

## Author

Amit Chavda

### Skills

* Node.js
* Express.js
* MongoDB
* Mongoose
* REST API Development
* Multer File Uploads

---

## License

This project is licensed under the MIT License.
