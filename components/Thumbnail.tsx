import Image from "next/image";
import { ThumbUpIcon } from "@heroicons/react/outline";
import React, { forwardRef } from "react";

interface ThumbType {
  result: {
    adult: boolean;
    backdrop_path: string;
    genre_ids: [number];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    media_type: string;
    original_name: string;
    first_air_date: string;
  };
  key: string;
}
const Thumbnail = forwardRef<HTMLDivElement, ThumbType>(({ result }, ref) => {
  const baseURL = "https://image.tmdb.org/t/p/original/";

  return (
    <div
      ref={ref}
      className="group cursor-pointer transition duration-200 
      ease-in transform sm:hover:scale-105 hover:z-50"
    >
      <Image
        layout="responsive"
        src={
          `${baseURL}${result.backdrop_path || result.poster_path}` ||
          `${baseURL}${result.poster_path}`
        }
        height={1080}
        width={1920}
      />
      <div className="p-2">
        <p className="truncate max-w-md">{result.overview}</p>

        <h2
          className="mt-1 text-2xl text-white transition-all 
          duration-100 ease-in-out group-hover:font-bold"
        >
          {result.title || result.original_name}
        </h2>

        <p className="flex items-center opacity-0 group-hover:opacity-100">
          {result.media_type && `${result.media_type} •`}{" "}
          {result.release_date || result.first_air_date} •{" "}
          <ThumbUpIcon className="h-5 mx-2" /> {result.vote_count}
        </p>
      </div>
    </div>
  );
});

export default Thumbnail;
