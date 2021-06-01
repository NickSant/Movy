import { GetStaticPropsContext } from "next";
import Header from "../../components/Header";
import requests from "../../utils/requests";

const API_KEY = process.env.API_KEY;

const Movie = ({ result }) => {
  const baseImgUrl = "https://image.tmdb.org/t/p/original/";

  return (
    <div>
      <Header />
      <div className="items-center flex flex-col sm:flex-row sm:px-16 sm:items-start mb-5">
        <img
          src={`${baseImgUrl}${result.poster_path}`}
          className="w-5/6 h-2/5 sm:w-3/12"
        />

        <div className="flex flex-col items-center sm:pl-5 sm:items-start">
          <h2 className="font-logo text-3xl mt-5 font-bold text-center sm:text-left px-10 sm:px-0">
            {result.title}
          </h2>
          <p className="text-center text-gray-400">
            {result.genres.map((genre) => (
              <span className="pr-5 font-semibold" key={genre.id}>
                {genre.name}
              </span>
            ))}
          </p>
          <span
            className={`px-2 py-1 my-3 font-bold ${
              result.vote_average >= 8 && "bg-green-500"
            } ${result.vote_average < 8 && "bg-yellow-500"} ${
              result.vote_average < 5 && "bg-red-500"
            }`}
          >
            {result.vote_average}{" "}
          </span>

          <p className="text-justify px-10 sm:text-left sm:px-0">
            {result.overview}
          </p>

          <br />
          <a
            href={result.homepage}
            target="_blank"
            className="px-5 py-3 rounded-sm bg-blue-500 font-semibold font-logo"
          >
            watch on the original platform
          </a>
        </div>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const res = await fetch(
    `https://api.themoviedb.org/3${
      requests.fetchTopRated?.url || requests.fetchTrending.url
    }`
  ).then((res) => res.json());

  const paths = res.results.map((result) => ({
    params: { movie: result.id.toString() || result.external_id.toString() },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${context.params.movie}?api_key=${API_KEY}`
  ).then((res) => res.json());

  return {
    props: {
      result: res,
    },
  };
}

export default Movie;
