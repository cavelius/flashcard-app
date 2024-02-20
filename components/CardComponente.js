import styled from "styled-components";
import { useRouter } from "next/router.js";
import { FormContainer, Input, Label } from "./Form";
import { StyledButton } from "./StyledButton.js";
import useSWR from "swr";

export default function Cards() {
  const router = useRouter();
  const { id } = router.query;
  const { data, mutate } = useSWR(`/api/courses/${id}`);

  const Article = styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 5px solid black;
    border-radius: 0.8rem;
    padding: 0.5rem;
    text-align: center;
    p {
      border-bottom: solid 1px black;
      padding: 20px;
    }
  `;

  console.log("data:", data);
  // Neue Card erstellen
  async function handleSubmitCard(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const cardData = Object.fromEntries(formData);
    console.log(formData);
    console.log(cardData);

    const response = await fetch(`/api/courses/${id}`, {
      method: "POST",
      body: JSON.stringify(cardData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      await response.json();
      mutate();
      e.target.reset();
    } else {
      console.error(`Error: ${response.status}`);
    }
  }
  async function handleDelete() {
    await fetch(`/api/courses/${id}`, {
      method: "DELETE",
    });
    // You are handing over the joke identified by its id to our DELETE request method.
    // This is the entire code required to do so.
    router.push("/");
    // After deleting the joke, you route back to our index page.
  }

  const cards = data?.cards;

  return (
    <Article>
      <FormContainer onSubmit={handleSubmitCard}>
        <Label htmlFor="question">Your Question</Label>
        <Input type="text" name="question" placeholder="question" />
        <Label htmlFor="answer">Your Answer</Label>
        <Input type="text" name="answer" placeholder="answer here..." />
        <StyledButton type="submit">Send</StyledButton>
      </FormContainer>
      {cards && (
        <>
          {cards.map(({ question, answer, _id }) => {
            return (
              <div key={_id}>
                <p>
                  <small>
                    <strong>{question}</strong>
                  </small>
                </p>
                <span>{answer}</span>
                <button type="button" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            );
          })}
        </>
      )}
    </Article>
  );
}
