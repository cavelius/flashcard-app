import Link from "next/link";
import { useRouter } from "next/router.js";
import useSWR from "swr";
import styled from "styled-components";
import { StyledLink } from "../../../components/StyledLink.js";
import { StyledButton } from "../../../components/StyledButton.js";
import { StyledImage } from "../../../components/StyledImage.js";
import Comments from "../../../components/Comments.js";

// 1 unterseite

const ImageContainer = styled.div`
  position: relative;
  height: 15rem;
`;

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
  const { id } = router.query;
  const {
    data: { course, comments } = {},
    isLoading,
    error,
    mutate,
  } = useSWR(`/api/courses/${id}`);

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
  async function addCardCourse(card) {
    const response = await fetch(`/api/courses/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(card),
    });

    if (response.ok) {
      mutate();
      alert("You Card was added succesfully! 🥳");
    } else {
      alert("There was a Error");
    }
  }

  return (
    <>
      <Link href={"/"} passHref legacyBehavior>
        <StyledLink justifySelf="start">back</StyledLink>
      </Link>
      <ImageContainer>
        <StyledImage
          src={course.image}
          priority
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          alt=""
        />
      </ImageContainer>
      <h2>
        {course.name}, {course.location}
      </h2>
      <Link href={course.mapURL} passHref legacyBehavior>
        <StyledLocationLink>Location on Google Maps</StyledLocationLink>
      </Link>
      <p>{course.description}</p>
      <ButtonContainer>
        <Link href={`/courses/${id}/edit`} passHref legacyBehavior>
          <StyledLink>Edit</StyledLink>
        </Link>
        <StyledButton onClick={deleteCourse} type="button" variant="delete">
          Delete
        </StyledButton>
      </ButtonContainer>
      <Comments
        submitComment={addCardCourse}
        locationName={course.name}
        comments={comments}
      />
    </>
  );
}
