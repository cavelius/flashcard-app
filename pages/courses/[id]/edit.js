import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import Form from "../../../components/Form.js";
import { StyledLink } from "../../../components/StyledLink.js";

// Edit Seite Course bearbeiten

export default function EditPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const {
    data: course,
    isLoading,
    error,
    mutate,
  } = useSWR(`/api/courses/${id}`);

  // unpdate Entry
  async function editCourse(course) {
    const response = await fetch(`/api/courses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
    });

    if (response.ok) {
      mutate();
      router.back();
    } else {
      alert("There was a Error");
    }
  }

  if (!isReady || isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error! 🔥</h2>;
  return (
    <>
      <h2 id="edit-course">Edit Course</h2>
      <Link href={`/courses/${id}`} passHref legacyBehavior>
        <StyledLink justifySelf="start">back</StyledLink>
      </Link>
      <Form
        onSubmit={editCourse}
        formName={"edit-course"}
        defaultData={course.course}
      />
    </>
  );
}
