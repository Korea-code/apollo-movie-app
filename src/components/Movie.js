import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo";

const SET_LIKE = gql`
  mutation setLike($id: Int!, $isLiked: Boolean) {
    setLike(id: $id, isLiked: $isLiked) @client
  }
`;

const Container = styled.div`
  width: 100%;
  height: 280px;
  justify-self: center;
`;

const Poster = styled.div`
  background-image: url(${props => props.bg});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  border-radius: 7px;
`;
const Like = styled.div`
  display: flex;
  margin: 3px 10px;
  justify-content: flex-end;
`;
const Button = styled.button`
  display: block;
  background-color: #3498db;
  border-radius: 3px;
  width: 80px;
  height: 20px;
  color: white;
`;
const Thumb = styled.p`
  margin-left: 10px;
`;

export default ({ id, bg, isLiked, detail }) => {
  const [setLike] = useMutation(SET_LIKE, {
    variables: { id: parseInt(id), isLiked }
  });
  return (
    <Container>
      <Link to={`/${id}`}>
        <Poster bg={bg} />
      </Link>
      {!detail && (
        <Like>
          <Button onClick={setLike}>{isLiked ? "Like" : "Unlike"}</Button>
          <Thumb>{isLiked ? "👍🏻" : "👎🏻"}</Thumb>
        </Like>
      )}
    </Container>
  );
};
