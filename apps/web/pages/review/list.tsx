import React from "react";
import { useGetReviewsQuery } from "redux/endpoints/review.endpoints";

const CreateReview = () => {
  const { data, isLoading } = useGetReviewsQuery({ movieId: 1 });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <ul>
        {data?.map((review) => (
          <li key={review.id}>
            <p>
              <b>{review.author.name}</b>
            </p>
            <p>{review.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateReview;
