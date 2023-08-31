import React from "react";
import RatingStar from "./RatingStar";
import Image from "next/image";

const ReviewCard = ({ data }) => {
  return (
    <li className="flex flex-col py-4 ">
      <section className="mb-2 mr-4 flex items-center">
        <Image
          src={data.profile_photo_url}
          alt="food"
          width={32}
          height={32}
          className="mr-2"
        />
        <p>{data.author_name}</p>
      </section>
      <section>
        <section className="mb-4 flex">
          <RatingStar rating={data.rating} />
          <p>{data.relative_time_description}</p>
        </section>
        <p>{data.text}</p>
      </section>
    </li>
  );
};

export default ReviewCard;
