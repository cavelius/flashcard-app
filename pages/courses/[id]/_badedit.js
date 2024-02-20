import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import Form from "../../../components/Form";
import { StyledLink } from "../../../components/StyledLink";

// Startseite Edit

export default function EditPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data: course, isLoading, error } = useSWR(`/api/courses/${id}`);

  if (!isReady || isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error! 🔥</h2>;

  // unpdate Entry
  async function editCourse(course) {
    console.log(course);
    const response = await fetch(`/api/courses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
    });

    if (response.ok) {
      await response.json();
      router.push("/");
    } else {
      const error = await response.json();
      console.error(`Error: ${error.message}`);
    }
  }

  return (
    <>
      <h2 id="edit-course">Edit Course</h2>
      <Link href="/" passHref legacyBehavior>
        <StyledLink justifySelf="start">back</StyledLink>
      </Link>
      <Form
        onSubmit={editCourse}
        formName={"edit-course"}
        defaultData={course}
      />
    </>
  );
}
