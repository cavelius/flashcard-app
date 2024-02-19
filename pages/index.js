import styled from "styled-components";
import Card from "../components/CourseComponente.js";
import useSWR from "swr";
import Link from "next/link.js";
import { StyledLink } from "../components/StyledLink.js";

// Frontend start Seite

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding-left: 0;
`;

const ListItem = styled.li`
  position: relative;
  width: 50%;
`;
const FixedLink = styled(StyledLink)`
  position: fixed;
  top: 50px;
  right: 50px;
`;
export default function Home() {
  // {data} wird verwendet, um dynamisch die Daten zu rendern,
  // die von der useSWR-Hook abgerufen wurden.
  const { data } = useSWR("/api/courses", { fallbackData: [] });

  console.log("data:", data);
  // data beinhaltet: id,name und description des courses

  return (
    <>
      <List role="list">
        {data.map((course) => {
          return (
            <ListItem key={course._id}>
              <Card
                name={course.name}
                description={course.description}
                id={`${course._id.$oid ?? course._id}`}
              />
            </ListItem>
          );
        })}
      </List>
      <Link href="/create" passHref legacyBehavior>
        <FixedLink>+ course</FixedLink>
      </Link>
    </>
  );
}
