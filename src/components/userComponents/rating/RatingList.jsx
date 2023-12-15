import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { reviewListUser } from "../../../api/userApi";
import { useState } from "react";

const RatingList = () => {
  const { state } = useLocation();
  const [reviews, setReviews] = useState([]);

  const { _id } = state.car;
  useEffect(() => {
    reviewListUser(_id)
      .then((res) => {
        setReviews(res?.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <>
      {reviews && reviews.length > 0 && (
        <div className="md:w-2/4 md:ml-32 m-4 mb-32">
          <h1 className="text-2xl font-bold text-black mb-5">Latest Reviews</h1>
          {reviews.map((review) => (
            <article key={review._id} className="mb-3">
              <div className="flex items-center mb-4">
                <img
                  className="w-10 h-10 me-4 rounded-full"
                  src={review?.postedBy?.profileImage}
                  alt=""
                />
                <div className="font-medium flex justify-end dark:text-white">
                  <p>
                    {review?.postedBy?.name} <br />
                    {review?.postedDate && (
                      <time dateTime={review?.postedDate}>
                        {new Date(review?.postedDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </time>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                {Array.from({ length: review?.star  }, (_, index) => (
                  <svg
                    key={index}
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                ))}
              </div>

              <p className="mb-2 text-gray-500 dark:text-gray-400">
                {review?.description}
              </p>
            </article>
          ))}
        </div>
      )}
    </>
  );
};

export default RatingList;
