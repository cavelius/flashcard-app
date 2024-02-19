import { useRouter } from "next/router.js";
import Link from "next/link";
import useSWR from "swr";
import styled from "styled-components";
import { StyledLink } from "../../../components/StyledLink.js";
import { StyledButton } from "../../../components/StyledButton.js";
import Card from "../../../components/CardComponente.js";

// Frontend der 1 Unterseite

const ButtonContainer = styled.section`
  display: flex;
  justify-content: space-between;
  gap: 0.2rem;

  & > * {
    flex-grow: 1;
    text-align: center;
  }
`;

const StyledLocationLink = styled(StyledLink)`
  text-align: center;
  background-color: white;
  border: 3px solid lightsalmon;
`;

export default function DetailsPage() {
  const router = useRouter();
  const { isReady } = router;
  // id verlinkt auf die [id] im ordnerverzeichnis
  const { id } = router.query;
  const { data: course, isLoading, error } = useSWR(`/api/courses/${id}`);

  // der aktuelle course wird angezeigt
  console.log("course:", course);

  if (!isReady || isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error! 🔥</h2>;

  async function deleteCourse() {
    if (confirm(`Are you sure that you want to delete this course?`) == true) {
      const response = await fetch(`/api/courses/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/");
      } else {
        alert(`There was a Error ${response.status}`);
      }
    }
  }

  return (
    <>
      <Link href={"/"} passHref legacyBehavior>
        <StyledLink justifySelf="start">back</StyledLink>
      </Link>
      <h2>{course.name}</h2>
      <p>{course.description}</p>
      <Link href={`/courses/${id}/start-quiz`} passHref legacyBehavior>
        <StyledLink>start quiz</StyledLink>
      </Link>
      <ButtonContainer>
        <Link href={`/courses/${id}/edit`} passHref legacyBehavior>
          <StyledLink>Edit</StyledLink>
        </Link>
        <StyledButton onClick={deleteCourse} type="button" variant="delete">
          Delete
        </StyledButton>
      </ButtonContainer>
      <Card />
    </>
  );
}
