import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Movie from "../components/Movie";
import styled from "styled-components";

const GET_MOVIES = gql`
  {
    movies(limit: 50, rating: 8.5) {
      id
      medium_cover_image
      isLiked @client
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: flex-start;
  align-items: center;
  background-color: #eee;
  color: black;
`;
const Header = styled.div`
  width: 100%;
  background: #833ab4; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #fcb045,
    #fd1d1d,
    #833ab4
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #fcb045,
    #fd1d1d,
    #833ab4
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 30%;
`;
const Title = styled.p`
  color: #eee;
  font-size: 3em;
  margin-bottom: 20px;
`;
const Subtitle = styled.p`
  color: #eee;
  font-size: 2em;
  margin-bottom 10px;
`;
const Loading = styled.p`
  color: #666;
  font-size: 1.5em;
  margin: 10px;
`;

const Movies = styled.div`
  display: grid;
  width: 80vw;
  min-width: 700px;
  max-width: 1000px;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  justify-content: space-around;
`;
export default () => {
  const { loading, error, data } = useQuery(GET_MOVIES);
  return (
    <Container>
      <Header>
        <Title>Apollo Movie App</Title>
        <Subtitle>Using GraphQL</Subtitle>
      </Header>
      {loading && <Loading>Loading...</Loading>}
      {!loading && data.movies && (
        <Movies>
          {data.movies.map(m => (
            <Movie
              key={m.id}
              id={m.id}
              isLiked={m.isLiked}
              bg={m.medium_cover_image}
              detail={false}
            ></Movie>
          ))}
        </Movies>
      )}
    </Container>
  );
};
