import { type JSX } from "react";
import type { SetDetailedGet } from "../Models/Set";
import Table from "../Components/Table/Table";

interface Props {
    set: SetDetailedGet | null
}

const tableConfig = [
  {
    label: "keyword",
    render: (fsc: any) => fsc.keyword,
  },
  {
    label: "definition",
    render: (fsc: any) => fsc.definition,
  },
];

const SetDetails : React.FC<Props> = ({set} : Props) : JSX.Element => {

    if (!set)
        return <div>No set data available</div>;

    return (
        
        <>  
            <div className="flex items-center justify-between">
                <p className="text-2xl mr-5 ml-2 font-bold">{set.name}</p>
                <p className="text-sm font-light">Made by: {set.authorUsername}</p>
            </div>
            
            {(set.flashcards && set.flashcards.length > 0) ? ( 
                <Table config={tableConfig} data={set.flashcards}/>
            ) : (
                <p className="text-left text-xl m-2">There are no flashcards in this set</p>
            )}
            
        </>
    )
}
export default SetDetails;