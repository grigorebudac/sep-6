import React from "react";
import { useCreateReviewMutation } from "redux/endpoints/review.endpoints";

const CreateReview = () => {
  const [createReview] = useCreateReviewMutation();

  async function handleCreateReview() {
    await createReview()
      .unwrap()
      .then((res) => console.log({ res }))
      .catch((error) => console.log({ error }));
  }

  return (
    <div>
      <button onClick={handleCreateReview}>Create Review</button>
    </div>
  );
};

export default CreateReview;
