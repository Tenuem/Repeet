import { useEffect, useState, type JSX, type SyntheticEvent } from "react";
import type { SetDetailedGet } from "../Models/Set";
import Table from "../Components/Table/Table";
import { useAuthContext } from "../Context/authContext";
import { updateSetAPI } from "../Services/SetService";
import { addFlashcardApi, deleteFlashcardApi, updateFlashcardApi } from "../Services/FlashcardService";
import { toast } from "react-toastify";

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
    const [newFlashcardWindow, setNewFlashcardWindow] = useState<boolean>(false);
    const [newFlashcard, setNewFlashcard] = useState<Flashcard | null>(null);
    
    const handleSetnameChange = async () => {
        setSetnameEditable(false);
        if (set){
            await updateSetAPI(set.id, setname);
        }
    }

    const handleAddNewFlashcard = async (e: any) => {
        e.preventDefault();

        const keyword = e.target[0].value;
        const definition = e.target[1].value;

        if (set){
            await addFlashcardApi(keyword, definition, set.id)
                .then((res) => {
                    if (res?.status === 201) {
                        setFlashcards(prev => ({
                            ...prev,
                            [set.id]: {
                                keyword: keyword,
                                definition: definition,
                                modified: false,
                                editable: false
                            }
                        }))
                        handleCancelNewFlashcard();
                    }
                });
        }
    }

    const handleCancelNewFlashcard = () => {
        setNewFlashcardWindow(false);
        setNewFlashcard(null);
    }

    const handleNewFlashcardChange = (keyword: string | null, definition: string | null) => {
        if (newFlashcard === null){
            setNewFlashcard({
                keyword: keyword ?? "",
                definition: definition ?? "",
                editable: true,
                modified: true
            })
        } else
            setNewFlashcard(prev => ({
                ...prev!, 
                keyword: keyword ?? prev!.keyword,
                definition: definition ?? prev!.definition
            }))
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
                <div className="flex items-center text-lg lg:text-2xl">
                    {setnameEditable ? (
                        <input onChange={(e) => setSetname(e.target.value)} value={setname} className="ml-2 max-w-3/5 focus:outline-none"/>
                    ) : (
                        <p className="ml-2 font-bold">{setname}</p>
                    )}                    
                    {user && user.username === set.authorUsername && (
                        setnameEditable ? (
                            <button onClick={handleSetnameChange} className="ml-2 text-base lg:text-xl hover:cursor-pointer">✔️</button>                   
                        ) : (                   
                            <button onClick={() => setSetnameEditable(true)} className="ml-2 text-base lg:text-xl hover:cursor-pointer">✏️</button>)
                        )                    
                    }
                </div>
                {user && user.username === set.authorUsername ? (
                    <p className="text-xs sm:text-sm font-light">Made by: <br />{set.authorUsername} (you)</p>
                ) : (
                    <p className="text-xs sm:text-sm font-light">Made by: {set.authorUsername}</p>
                )}
            </div>
            
            {(set.flashcards && set.flashcards.length > 0) ? ( 
                (!user || user.username !== set.authorUsername) ? (
                    <Table config={tableConfig} data={set.flashcards}/>
                ) : (
                    <>
                    <div className="flex bg-[var(--background)] shadow rounded-lg my-4">
                        <table className="w-full divide-y divide-gray-200 table-fixed">
                            <thead className="bg-gray-50 text-xs lg:text-base font-medium text-gray-500 uppercase tracking-wider">
                                <tr>
                                    <th className="pl-1 md:p-4 text-left w-2/5">Keyword</th>
                                    <th className="py-1 md:p-4 text-left w-2/5">Definition</th>
                                    <th className="py-1 md:p-4 text-center w-1/10">Edit</th>
                                    <th className="py-1 md:p-4 text-center w-1/10">Delete</th>
                                </tr>
                            </thead>
                            <tbody className="text-[var(--foreground)] text-sm md:text-lg lg:text-xl">
                                {
                                    Object.entries(flashcards).map(([id, f]) => {
                                        return (
                                            <tr key={id} className="w-full">
                                                <td className="pl-1 md:p-4 w-2/5">
                                                    {f.editable ? (
                                                        <div className="flex flex-row">
                                                            {f.modified && (<p className="text-orange-500 mr-1">• </p>)}
                                                            <input value={f.keyword} onChange={(e) => handleFlashcardKeywordChange(e.target.value, id)}
                                                                className="focus:outline-none "/>
                                                        </div>
                                                        ) : (
                                                            f.keyword
                                                        )}
                                                </td>

                                                <td className="md:p-4 w-2/5">
                                                    {f.editable ? (
                                                        <input value={f.definition} onChange={(e) => handleFlashcardDefinitionChange(e.target.value, id)}
                                                            className="focus:outline-none"/>
                                                        ) : (
                                                            f.definition
                                                        )}
                                                </td>                                                    

                                                <td className="md:p-4">
                                                    {f.editable ? (
                                                        <button onClick={() => handleFlashcardUpdate(id)} className="hover:cursor-pointer w-full">✔️</button>                   
                                                    ) : (                   
                                                        <button onClick={() => changeEditability(id, true)} className="hover:cursor-pointer w-full">✏️</button>
                                                    )}
                                                    
                                                </td>
                                                
                                                <td className="md:p-4">
                                                    <button onClick={() => handleDeleteFlashcard(id)} className="hover:cursor-pointer w-full">🗑️</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className="w-full flex justify-between items-center px-4">
                        <p className="hover:cursor-pointer hover:text-[var(--highlight-fuchsia)]"
                            onClick={(_) => setNewFlashcardWindow(true)}>ADD NEW</p>
                        <button className="bg-[var(--highlight-mint)] rounded-lg lg:rounded-xl self-end lg:text-lg
                            :cursor-pointer mt-4 text-[var(--background)] p-2 lg:px-3 hover:cursor-pointer font-bold"
                            onClick={saveAllChanges}>Save changes</button>
                    </div>

                    {newFlashcardWindow && (
                        <div className="w-full shadow rounded-xl text-[var(--foreground)] text-sm md:text-lg lg:text-xl my-4">
                            <form onSubmit={handleAddNewFlashcard} className="bg-gray-100">
                                <input type="text" className="w-2/5 focus:outline-none md:p-4" placeholder="Keyword" required
                                    onChange={(e) => handleNewFlashcardChange(e.target.value, null)}/>
                                <input type="text" className="w-2/5 focus:outline-none md:p-4" placeholder="Definition" required
                                    onChange={(e) => handleNewFlashcardChange(null, e.target.value)}/>
                                <button type="submit" className="hover:cursor-pointer w-1/10 text-[var(--highlight-mint)]">SAVE</button>
                                <button onClick={handleCancelNewFlashcard} className="hover:cursor-pointer w-1/10 text-red-500">CANCEL</button>
                            </form>
                            

                        </div>
                    )}
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