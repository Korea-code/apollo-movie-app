import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components";
import Movie from "../components/Movie";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      rating
      medium_cover_image
      language
      description_full
      isLiked @client
    }
    suggestion(id: $id) {
      id
      medium_cover_image
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

const Loading = styled.p`
  color: #666;
  font-size: 1.5em;
  margin: 10px;
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
  height: 20%;
  margin-bottom: 30px;
`;
const Title = styled.p`
  color: #eee;
  font-size: 3em;
  margin-bottom: 20px;
`;
const Content = styled.div`
  height: 70%;
  display: flex;
`;
const Poster = styled.div`
  width: 300px;
  height: 430px;
  background-image: url(${props => props.dbg});
  border-radius: 7px;
  margin-right: 20px;
  background-size: cover;
  background-position: center center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;
const Details = styled.div`
  width: 500px;
  height: 600px;
  display: flex;
  flex-direction: column;
  color: #666;
  font-size: 1.2em;
`;
const Title_ = styled.p`
  margin: 20px 5px;
  font-size: 1.3em;
`;
const Rating = styled.p`
  justify-self: flex-end;
  font-size: 1.2em;
  margin: 5px 5px;
`;
const Language = styled.p`
  font-size: 1.2em;
  margin: 5px 5px;
`;
const Description = styled.div`
  margin: 10px 0;
`;
const Suggestions = styled.div`
  margin: 10px 20px;
  display: grid;
  width: 90%;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 5px;
  justify-content: space-around;
`;

export default () => {
  let { id } = useParams();
  id = Number(id);
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id }
  });

  return (
    <Container>
      {loading && <Loading>"loading..."</Loading>}
      {data && data.movie && (
        <>
          <Header>
            <Title>{data.movie.title}</Title>
          </Header>
          <Content>
            <Poster dbg={data.movie.medium_cover_image} />
            <Details>
              <Title_>Title: {data.movie.title}</Title_>
              <Rating>
                Rating: {data.movie.rating} {data.movie.isLiked ? "👍🏻" : " "}
              </Rating>
              <Language>Language: {data.movie.language}</Language>
              <Description>{data.movie.description_full}</Description>
              Suggestions
              <Suggestions>
                {data.suggestion.map(s => (
                  <Movie
                    key={s.id}
                    id={s.id}
                    detail={true}
                    bg={s.medium_cover_image}
                  />
                ))}
              </Suggestions>
            </Details>
          </Content>
        </>
      )}
    </Container>
  );
};
