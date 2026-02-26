import type { JSX } from "react"
import { Link } from "react-router-dom";

interface Props {
    id: string,
    name: string,
    author: string,
}

const SetTile : React.FC<Props> = ({id, name, author}: Props) : JSX.Element => {

    return (
        <Link to={`?setid=${id}`} 
            className="flex flex-col items-center justify-center rounded-2xl px-3 shadow-2xl border-2 aspect-[7/4] mx-5 my-5 
                        bg-[var(--foreground)] text-[var(--background)] hover:cursor-pointer">
            <div className="h-1/5"></div>
            <h2 className="text-3xl text-center h-3/5 flex items-center font-bold">{name}</h2>
            <div className="h-1/5 w-full text-right">
                <h4>author: {author}</h4>
            </div>
        </Link>
    )
}

export default SetTile;