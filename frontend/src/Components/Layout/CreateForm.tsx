import { useEffect, useState, type ChangeEvent, type JSX, type SyntheticEvent } from "react";
import { getAuthorsSetsAPI } from "../../Services/SetService";
import type { SetDetailedGet } from "../../Models/Set";
import { handleError } from "../../Helpers/ErrorHandler";
import { useAuthContext } from "../../Context/authContext";


interface Props {
    setBlur: (val: boolean) => void;
    handleOnFormSubmit: (e: any) => void;
    setSelectedSetId: (val: string) => void;
    isNewSet: () => boolean;
    newSetString: string;
}

const CreateForm : React.FC<Props> = ({setBlur, handleOnFormSubmit, setSelectedSetId, isNewSet, newSetString}) : JSX.Element => {
    const [sets, setSets] = useState<SetDetailedGet[] | null >([]);
    const [chosenSet, setChosenSet] = useState<SetDetailedGet | null>(null);
    const { user } = useAuthContext();

    const [newKeywords, setNewKeywords] = useState<string[]>([]);
    const [newDefinitions, setNewDefinitions] = useState<string[]>([]);


    useEffect(() => {

        if (user)
        getAuthorsSetsAPI(user.username)
        .then((res) => {
            if (res?.data)
                setSets(res?.data); 
        })
        .catch((e) => {
            setSets(null);
            handleError(e);
        });        
    }, []);

    const handleSetSelection = (e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
        const id = e.target.value;
        setSelectedSetId(id);
        console.log("id " + id);
        if (id === newSetString || !sets){
            setChosenSet(null);
            return;
        }
        const set = sets.find(s => s.id === id);
        set ? setChosenSet(set) : setChosenSet(null);
    }

    const handleAddNew = (e: SyntheticEvent) => {
        setNewKeywords([...newKeywords, ""]);
        setNewDefinitions([...newDefinitions, ""]);
    }

    const updateKeywordInput = (index: number, val: string) => {
        const newKey = [...newKeywords];
        newKey[index] = val;
        setNewKeywords(newKey);
    }
    const updateDefinitionInput = (index: number, val: string) => {
        const newDef = [...newDefinitions];
        newDef[index] = val;
        setNewDefinitions(newDef);
    }

    const deleteEntry = (index: number) => {
        if (newKeywords.length >= 0)
            setNewKeywords(newKeywords.filter((_, i) => i !== index));
        if (newDefinitions.length >= 0) 
            setNewDefinitions(newDefinitions.filter((_, i) => i !== index));
    }


    return (
        <div className='w-1/4 max-h-3/4 flex flex-col bg-[var(--foreground)] mx-auto 
                rounded-3xl shadow-3xl p-6 overflow-clip 
                top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute text-[var(--background)]'
                style={{
                    backdropFilter: 'blur(5px)',
                    WebkitBackdropFilter: 'blur(5px)',  
                }}>
            <p onClick={() => setBlur(false)} className='text-left text-xl hover:cursor-pointer h-1/10 w-1/10 font-semibold'>x</p>

            <form className='w-full h-4/5 flex flex-col space-y-4' onSubmit={handleOnFormSubmit}>
                <label htmlFor="setSelect" className="text-slate-100/50 text-sm mb-1">Choose set</label>
                <select id="setSelect" onChange={handleSetSelection} className="border p-2 rounded text-[var(--foreground)] bg-[var(--background)]">
                    <option key={newSetString} value={newSetString}>Create new</option>
                    {sets &&
                        sets.length > 0 &&
                            sets.map(set => {
                                return (
                                    <option key={set.id} value={set.id}>{set.name}</option>
                                )
                            })
                    }
                </select>
                
                {isNewSet() ? (
                    <>
                        <label htmlFor="setName" className="text-slate-100/50 text-sm mb-1">Name of the new set</label>
                        <input type="text" id="setName" required className="border-b text-lg focus:outline-none"/>
                    </>
                ) : (
                    chosenSet && 
                        chosenSet.flashcards.length > 0 ? ( 
                            <>
                                <div className="flex justify-between my-1">
                                    <p className="text-slate-100/50 text-sm mb-1">Currently in the set:</p>
                                    <div>
                                        <p className="text-slate-100/50 text-sm mb-1">Page 1/4</p>
                                    </div>
                                </div>
                                {chosenSet.flashcards.map(f => {
                                    return (
                                        <div className="flex w-17/18 my-0 text-slate-800 bg-slate-100/80 rounded-sm">
                                            <p className="w-1/2 m-0 border pl-2" key={`k${f.id}`}>{f.keyword}</p>
                                            <p className="w-1/2 m-0 border pl-2" key={`d${f.id}`}>{f.definition}</p>
                                        </div>
                                    )                
                                })} 
                            </>    
                        ) : (
                            <p className="ml-2 text-slate-100/50 text-sm mb-1">No flashcards yet</p>
                        )
                )}
                
                {chosenSet && chosenSet.flashcards.length > 0 && <hr className={`border-t border-[var(--highlight-mint)] w-16/17 my-1`} />}

                {newKeywords.map((value, index) => {
                    const definition = newDefinitions.at(index);
                    return (
                        <div className="flex w-full my-0 text-slate-800 ">
                            <input key={index*2} className="w-8/17 m-0 border pl-2 bg-slate-100/80" value={value} placeholder="Keyword"
                                onChange={(e) => updateKeywordInput(index, e.target.value)} required/>
                            <input key={index*2 + 1} className="w-8/17 m-0 border pl-2 bg-slate-100/80" value={definition} placeholder="Definition"
                                onChange={(e) => updateDefinitionInput(index, e.target.value)} required/>
                            <button type="button" onClick={() => deleteEntry(index)} className="w-1/17 text-red-500 font-bold hover:cursor-pointer">X</button>
                        </div>
                    )
                })}
                
                <p onClick={handleAddNew} className="m-2 hover:cursor-pointer text-sm hover:text-slate-500">Add</p>
                <button type="submit"  
                    className='h-1/15 w-1/3 right-6 rounded-lg bg-[var(--highlight-mint)] self-end mr-2
                    hover:cursor-pointer mt-4'>Save</button>
            </form>
        </div>
    )
}
export default CreateForm;