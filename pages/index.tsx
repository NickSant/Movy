import Head from "next/head";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Results from "../components/Results";
import requests from "../utils/requests";

export default function Home({ results, genre }) {
  return (
    <div>
      <Head>
        <title>Movy</title>
        <meta name="description" content="Discover your new favorite movie" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Nav activeGenre={genre} />
      <Results results={results} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const method = context.query.method;
  const genre = context.query.genre || "Top Rated";

  const req = await fetch(
    `https://api.themoviedb.org/3${
      requests[method]?.url || requests.fetchTrending.url
    }`
  ).then((res) => res.json());

  return {
    props: {
      results: req.results,
      genre: genre,
    },
  };
}
