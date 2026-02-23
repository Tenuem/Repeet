import { type JSX } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/authContext";
import { useMediaQuery } from "../../Helpers/Screensizer";

interface Props {
  setBlur: (val: boolean) => void;
}

const Navbar = ({ setBlur } : Props) : JSX.Element => {
  const { isLoggedIn } = useAuthContext();
  const navigate = useNavigate()

  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <nav className="shadow text-xs md:text-lg lg:text-xl p-1 xl:px-4 md:p-2 h-10 md:h-16 lg:h-18">
      <div className="w-full h-full mx-auto flex flex-row justify-between overflow-hidden">
        <div className="flex my-auto">
          <Link to="/" className="font-bold ml-1 px-1 md:px-2 xl:px-3">REPEET</Link>
          <Link to="/explore" className="hover:scale-105 px-1 md:px-2 xl:px-3">EXPLORE</Link>
          <Link to="/revisions" className="hover:scale-105 px-1 md:px-2 xl:px-3">REVISIONS</Link>
          <Link to="/games" className="hover:scale-105 px-1 md:px-2 xl:px-3">GAMES</Link>
        </div>
        <div className="my-auto px-1">
          { !isMobile && (
            isLoggedIn() && (
              <button onClick={() => setBlur(true)} className="px-1 md:px-3 mx-1 bg-[var(--highlight-mint)] hover:scale-105 text-white rounded hover:cursor-pointer">+ NEW</button>
            )
          )}
          { isLoggedIn() ? (
            <Link to="/myaccount" className="px-1 md:px-2 hover:scale-105">MY ACCOUNT</Link>
          ) : (
            <button onClick={() => navigate("/login")}
              className="px-1 lg:px-2 mx-1 hover:scale-105 text-[var(--background)] rounded
              bg-[var(--highlight-fuchsia)] transition-colors hover:cursor-pointer">SIGN IN</button>
          )}
          </div>
      </div>
    </nav>
  );
}
export default Navbar;
