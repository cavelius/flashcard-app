import dbConnect from "../../../db/connection.js";
import Course from "@/db/models/Course.js";

// BACKEND START

export default async function handler(request, response) {
  try {
    await dbConnect();
    // Daten auf Datenbank lesen
    if (request.method === "GET") {
      const courses = await Course.find();
      return response.status(200).json(courses);
    }
    // Daten auf Datenbank erstellen
    if (request.method === "POST") {
      Course.create(request.body);
      return response
        .status(200)
        .json({ success: true, status: "Course created" });
    }
    // Daten von Datenbank bearbeiten
    if (request.method === "PUT") {
      const courseToUpdate = await Course.findByIdAndUpdate(id, request.body);
      response.status(200).json(courseToUpdate);
    }
  } catch (e) {
    console.log(e);
  }
}
