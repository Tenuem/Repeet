import { useEffect, useState, type JSX } from "react";
import type { SetDetailedGet } from "../Models/Set";
import Table from "../Components/Table/Table";
import { useAuthContext } from "../Context/authContext";
import { updateSetAPI } from "../Services/SetService";
import { deleteFlashcardApi, updateFlashcardApi } from "../Services/FlashcardService";

type Flashcard = {
    keyword: string;
    definition: string;
    modified: boolean;
    editable: boolean;
};

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

    const nosetnamePlaceholder = "No set name!";
    const { user } = useAuthContext();
    const [setname, setSetname] = useState<string>(nosetnamePlaceholder);
    const [setnameEditable, setSetnameEditable] = useState<boolean>(false);

    const [flashcards, setFlashcards] = useState<Record<string, Flashcard>>({});
    
    const handleSetnameChange = async () => {
        setSetnameEditable(false);
        if (set){
            await updateSetAPI(set.id, setname);
        }
    }

    const handleFlashcardUpdate = async (id: string) => {
        const f = flashcards[id];
        await updateFlashcardApi(f.keyword, f.definition, id);
        changeEditability(id, false);
    }

    const handleFlashcardDefinitionChange = (val: string, id: string) => {
        setFlashcards(
            prev => ({
                ...prev,
                [id]: {
                    ...prev[id],
                    definition: val,
                    modified: true
                }
            })
        )
    }

    const handleFlashcardKeywordChange = (val: string, id: string) => {
        setFlashcards(
            prev => ({
                ...prev,
                [id]: {
                    ...prev[id],
                    keyword: val,
                    modified: true
                }
            })
        )
    }

    const changeEditability = (id: string, val: boolean) => {
        setFlashcards(
            prev => ({
                ...prev,
                [id]: {
                    ...prev[id],
                    editable: val
                }
            })
        )
    }

    const handleDeleteFlashcard = async (id: string) => {
        await deleteFlashcardApi(id);
        setFlashcards(prev => {
            const copy = { ...prev };
            delete copy[id];
            return copy;
        });
    }

    const saveAllChanges = () => {
        if (set) {
            Object.entries(flashcards).map(([id, f]) => {
                if (f.modified)
                    handleFlashcardUpdate(id);
            });  
        }
    }

    useEffect(() => {
        if (set){
            if (setname === nosetnamePlaceholder)
                setSetname(set.name);
            setFlashcards(
                Object.fromEntries(
                    set.flashcards.map(f => [
                        f.id,
                        {keyword: f.keyword, definition: f.definition, modified: false, editable: false}
                    ])
                )
            )
        }
    }, [set?.flashcards]);

    if (!set)
        return <div>No set data available</div>;

    return (
        
        <>  
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    {setnameEditable ? (
                        <input onChange={(e) => setSetname(e.target.value)} value={setname} className="text-2xl mr-5 ml-2 focus:outline-none"/>
                    ) : (
                        <p className="text-2xl mr-5 ml-2 font-bold">{setname}</p>
                    )}                    
                    {user && user.username === set.authorUsername && (
                        setnameEditable ? (
                            <button onClick={handleSetnameChange} className="text-lg mr-5 ml-2 hover:cursor-pointer">✔️</button>                   
                        ) : (                   
                            <button onClick={() => setSetnameEditable(true)} className="text-lg mr-5 ml-2 hover:cursor-pointer">✏️</button>)
                        )                    
                    }
                </div>
                {user && user.username === set.authorUsername ? (
                    <p className="text-sm font-light">Made by: {set.authorUsername} (you)</p>
                ) : (
                    <p className="text-sm font-light">Made by: {set.authorUsername}</p>
                )}
            </div>
            
            {(set.flashcards && set.flashcards.length > 0) ? ( 
                (!user || user.username !== set.authorUsername) ? (
                    <Table config={tableConfig} data={set.flashcards}/>
                ) : (
                    <>
                    <div className="flex bg-[var(--background)] shadow rounded-lg my-4">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-4/9">Keyword</th>
                                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-4/9">Definition</th>
                                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit</th>
                                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
                                </tr>
                            </thead>
                            <tbody className="text-[var(--foreground)]">
                                {
                                    Object.entries(flashcards).map(([id, f]) => {
                                        return (
                                            <tr key={id}>
                                                <td className="p-3 w-4/9">
                                                    {f.editable ? (
                                                        <div className="flex flex-row">
                                                            {f.modified && (<p className="text-orange-500 mr-1">• </p>)}
                                                            <input value={f.keyword} onChange={(e) => handleFlashcardKeywordChange(e.target.value, id)}
                                                                className="focus:outline-none"/>
                                                        </div>
                                                        ) : (
                                                            f.keyword
                                                        )}
                                                </td>
                                                <td className="p-3 w-4/9">
                                                    {f.editable ? (
                                                        <input value={f.definition} onChange={(e) => handleFlashcardDefinitionChange(e.target.value, id)}
                                                            className="focus:outline-none"/>
                                                        ) : (
                                                            f.definition
                                                        )}
                                                </td>                                                    
                                                {
                                                    //<td className="p-3 w-4/9">{f.definition}</td>
                                                }
                                                <td className="p-3 text-center">
                                                    {f.editable ? (
                                                        <button onClick={() => handleFlashcardUpdate(id)} className="text-lg mr-5 ml-2 hover:cursor-pointer">✔️</button>                   
                                                    ) : (                   
                                                        //<button onClick={() => handleRowChange(id)} className="hover:cursor-pointer">✏️</button>
                                                        <button onClick={() => changeEditability(id, true)} className="hover:cursor-pointer">✏️</button>
                                                    )}
                                                    
                                                </td>
                                                <td className="p-3 text-center">
                                                    <button onClick={() => handleDeleteFlashcard(id)} className="text-lg mr-5 ml-2 hover:cursor-pointer">🗑️</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className="w-full flex items-right justify-end">
                        <button className="bg-[var(--highlight-mint)] right-6 rounded-lg self-end mr-2
                            :cursor-pointer mt-4 text-[var(--background)] p-2 hover:cursor-pointer font-bold"
                            onClick={saveAllChanges}>Save changes</button>
                    </div>
                    </>
                )
                //

            ) : (
                <p className="text-left text-xl m-2">There are no flashcards in this set</p>
            )}
            
        </>
    )
}
export default SetDetails;