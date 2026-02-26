import type React from "react";
import type { SetGet } from "../../Models/Set";
import type { JSX, SyntheticEvent } from "react";
import SetTile from "./SetTile";

interface Props {
    setArray: SetGet[] | null,
    redirect: (e: SyntheticEvent) => string
}

const SetList : React.FC<Props> = ({setArray} : Props) : JSX.Element => {

    return (
        <div className="flex my-10">
            {(setArray != null && setArray.length > 0) ? ( 
                setArray.map((set) => {
                    return (                     
                        <div key={set.id} className="w-full">                   
                            <SetTile key={set.id} id={set.id} name={set.name} author={set.authorUsername}/> 
                        </div>
                    )
                }
            )) : (
                <p>No results found</p>
            )}
        </div>
    )
}
export default SetList;