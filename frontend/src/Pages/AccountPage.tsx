import { type JSX} from "react";
import { useAuthContext } from "../Context/authContext";

const AccountPage : React.FC = () : JSX.Element => {
    const { isLoggedIn, logoutUser, user } = useAuthContext();


    return (
        <div className="container flex flex-col w-4/5 min-h-[60vh] mx-auto items-center text-lg p-2 justify-center">
            <p className="font-bold m-1">{user?.username}</p>
            {isLoggedIn() && (
                <button onClick={() => logoutUser()}
                className="px-1 mx-1 w-1/2 p-1
                    hover:scale-105 text-[var(--background)] bg-[var(--highlight-fuchsia)] rounded-xl
                    hover:bg-[var(--secondary-dark)] transition-colors hover:text-[var(--background)] hover:cursor-pointer">SIGN OUT</button>
            )}
        </div>
    );
} 
export default AccountPage;