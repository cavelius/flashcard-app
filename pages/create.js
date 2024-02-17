import Link from "next/link.js";
import styled from "styled-components";
import { useRouter } from "next/router";
import Form from "../components/Form.js";
import { StyledLink } from "../components/StyledLink.js";
import useSWR from "swr";

// add course Seite

const StyledBackLink = styled(StyledLink)`
  justify-self: flex-start;
`;

export default function CreateCoursePage() {
  const router = useRouter();

  // erstellt einen neuen Course
  async function addCourse(course) {
    const response = await fetch(`/api/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
    });

    if (response.ok) {
      await response.json();
      router.push("/");
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

  return (
    <>
      <h2 id="add-place">Add Course</h2>
      <Link href="/" passHref legacyBehavior>
        <StyledBackLink>back</StyledBackLink>
      </Link>
      <Form onSubmit={addCourse} formName={"add-place"} />
    </>
  );
}
