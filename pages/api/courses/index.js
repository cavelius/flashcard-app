import dbConnect from "../../../db/connection.js";
import Courses from "../../../db/schemas/courses.schema.js";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const courses = await Courses.find();
      return response.status(200).json(courses);
    } catch (e) {
      console.error(e);
      return response.status(404).json({ error: e.message });
    }
  }
  if (request.method === "POST") {
    try {
      const courseData = request.body;
      await Courses.create(courseData);
      return response.status(200).json({ status: "New Course created!" });
    } catch (e) {
      console.error(e);
      return response.status(404).json({ error: e.message });
    }
  }

  return response.status(405).json({ message: "Method not allowed" });
}
