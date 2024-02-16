import dbConnect from "../../../../db/connection";
import Courses from "../../../../db/schemas/courses.schema";
import Comments from "../../../../db/schemas/cards.schema";
import { db_comments } from "../../../../lib/db_comments";

export default async function handler(request, response) {
  const { id } = request.query;

  if (!id) {
    return;
  }
  // Initializing the connection.
  await dbConnect();

  if (request.method === "GET") {
    const course = await Courses.findById(id);
    const commentIds = course?.comments;

    if (!course) {
      return response.status(404).json({ status: "Not found" });
    }

    if (commentIds && commentIds.length > 0) {
      const comments = (
        await Promise.all(
          commentIds.map(async (commentId) => {
            const fullComment = await Comments.findById(commentId);
            return fullComment;
          })
        )
      ).filter(Boolean);

      return response.status(200).json({ course: course, comments: comments });
    } else {
      return response.status(200).json({ course: course, comments: [] });
    }
  }

  // Course updaten mit der Edit Form
  if (request.method === "PUT") {
    await Courses.findByIdAndUpdate(id, {
      $set: request.body,
    });

    return response.status(200).json({ status: "course sucsessfully updated" });
  }
  // DELETE Course
  if (request.method === "DELETE") {
    try {
      // First Delete the comments of the Course
      await Courses.findById(id)
        .select("comments")
        .then(async (document) => {
          const comments = document.comments;
          if (comments.length > 0) {
            comments.forEach(async (id) => {
              await Comments.findByIdAndDelete(id);
            });
          }
        });
      // Then Delete the Course
      const courses = await Courses.findByIdAndDelete(id);
      if (!courses) {
        return response.status(404).json({ message: "Document not found" });
      }

      return response
        .status(200)
        .json({ message: "Course deleted", data: courses });
    } catch (error) {
      return response.status(405).json({ message: error.message });
    }
  }

  if (request.method === "POST") {
    try {
      const newComment = request.body;
      const requestCommentCreate = await Comments.create(newComment);

      await Courses.updateOne(
        { _id: id },
        { $push: { comments: requestCommentCreate._id } }
      );

      return response.status(200).json({
        message: "New comment added!",
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
