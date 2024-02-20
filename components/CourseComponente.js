import Link from "next/link";
import styled from "styled-components";

const Article = styled.article`
  // border: 5px solid black;
  border-radius: 0.8rem;
  padding: 0.5rem;
  background-color: #f5f5f5;
  box-shadow: 3px 3px 5px #e8e8e8;
`;

const Figure = styled.figure`
  position: relative;
  margin: 0;
`;

const Anchor = styled.a`
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

const ScreenReaderOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

const Name = styled.h2`
  color: black;
  font-size: 20px;
`;

const Descripiton = styled.p`
  color: black;
  font-size: 15px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  background-color: lightblue;
  border: none;
  border-radius: 0.4rem;
  padding: 0.3rem 0.5rem;
  cursor: pointer;
`;

export default function Course({ name, description, id }) {
  return (
    <Article>
      <Figure>
        <figcaption>
          <Name>{name}</Name>
        </figcaption>
      </Figure>
      <p>
        <Descripiton>Description: {description}</Descripiton>
      </p>
      <ButtonContainer>
        <Link href={`/courses/${id}`} passHref>
          <Button>Cards</Button>
        </Link>
        <Link href={`/courses/${id}/edit`} passHref>
          <Button>Edit</Button>
        </Link>
      </ButtonContainer>
    </Article>
  );
}
