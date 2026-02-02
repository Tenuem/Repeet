import type React from "react";
import type { SetGet } from "../../Models/Set";
import type { JSX } from "react";
import SetTile from "./SetTile";

interface Props {
    setArray: SetGet[] | null;
}

const SetGrid : React.FC<Props> = ({setArray} : Props) : JSX.Element => {

    return (
        <div className="grid grid-cols-3 grid-rows-2 gap-0 my-10">
            {(setArray != null && setArray.length > 0) ? ( 
                setArray.map((set) => {
                    return (
                        <div key={set.id} className="w-full">                   
                            <SetTile key={set.id} id={set.id} name={set.name} author={set.authorUsername}/> 
                        </div>  
                    )
                }
            )) : (
                <p className="text-center text-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute">No results found</p>
            )}
        </div>
    )
}
export default SetGrid;