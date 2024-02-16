import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const coursesSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  mapURL: { type: String, required: true },
  description: { type: String, required: true },
  comments: [{ type: String, required: true }],
});

const Courses = models.courses || model("courses", coursesSchema);

export default Courses;
console.log("________________Courses:", Courses);
