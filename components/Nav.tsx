import { useRouter } from "next/router";
import categories from "../utils/requests";

const Nav = ({ activeGenre }) => {
  const router = useRouter();

  return (
    <nav className="relative">
      <div
        className="flex py-5 sm:px-5 text-2xl
          whitespace-nowrap space-x-10 sm:space-x-15 overflow-x-scroll
          scrollbar-hide"
      >
        {Object.entries(categories).map(([key, { title, url }]) => {
          return (
            <h2
              
              key={key}
              onClick={() => router.push(`/?method=${key}&genre=${title}`)}
              className={`last:pr-24 cursor-pointer transition duration-100
                transform hover:scale-125 hover:text-white ${activeGenre === title && "text-red-500 hover:text-red-400"}
              `}
            >
              {title}
            </h2>
          );
        })}
      </div>
      <div className="absolute top-0 right-0 bg-gradient-to-l from-[#06202A] h-20 w-1/12" />
    </nav>
  );
};

export default Nav;
