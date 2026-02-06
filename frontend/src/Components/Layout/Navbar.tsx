import { type JSX } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/authContext";

interface Props {
  setBlur: (val: boolean) => void;
}

const Navbar = ({ setBlur } : Props) : JSX.Element => {
  const { isLoggedIn, logoutUser } = useAuthContext();
  const navigate = useNavigate()

  return (
    <nav className="shadow ">
      <div className="max-w-7xl mx-auto p-4 h-14 flex justify-between">
        <div className="flex">
          <Link to="/" className="text-lg font-bold hover:scale-105 px-4">REPEET</Link>
          <Link to="/explore" className="text-lg hover:scale-105 px-4">EXPLORE</Link>
          <Link to="/revisions" className="text-lg hover:scale-105 px-4">REVISIONS</Link>
          <Link to="/games" className="text-lg hover:scale-105 px-4">GAMES</Link>
        </div>
        <div>

          { isLoggedIn() && (
            <button onClick={() => setBlur(true)} className="px-4 bg-[var(--highlight-mint)] hover:scale-105 mx-4 text-white rounded hover:cursor-pointer">+ NEW</button>
          )}
          { !isLoggedIn() ? (
          <button onClick={() => navigate("/login")}
            className="px-4 border-2  border-[var(--secondary-dark)] hover:scale-105 text-[var(--secondary-dark)] rounded
                      hover:bg-[var(--secondary-dark)] transition-colors hover:text-[var(--background)] hover:cursor-pointer">SIGN IN</button>
          ) : (
          <button onClick={() => logoutUser()}
            className="px-4 border-2  border-[var(--secondary-dark)] hover:scale-105 text-[var(--secondary-dark)] rounded
                      hover:bg-[var(--secondary-dark)] transition-colors hover:text-[var(--background)] hover:cursor-pointer">SIGN OUT</button>
          )}
          </div>
      </div>
    </nav>
  );
}
export default Navbar;
