import React from "react";
import { useDeleteReviewMutation } from "redux/endpoints/review.endpoints";

const DeleteReview = () => {
  const [deleteReview] = useDeleteReviewMutation();

  async function handleDeleteReview() {
    await deleteReview({
      reviewId: "0fdd8d1d-9c89-41dd-83c3-9f83172f4a11",
    })
      .unwrap()
      .then((res) => console.log({ res }))
      .catch((error) => console.log({ error }));
  }

  return (
    <div>
      <button onClick={handleDeleteReview}>Delete Review</button>
    </div>
  );
};

export default DeleteReview;
