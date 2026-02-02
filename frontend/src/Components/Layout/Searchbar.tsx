import type { ChangeEvent, JSX, SyntheticEvent } from "react";


interface Props {
    search: string | undefined;
    handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    updateSets: (e: SyntheticEvent) => void;
}

const Searchbar : React.FC<Props> = ({search, handleSearchChange, handleEnter, updateSets} : Props) : JSX.Element => {
                
            return (    
                <>
                    <div className="flex w-3/5 mx-auto">
                        <div className="border-2 border-[var(--foreground)] rounded-xl bg-slate-100 flex items-center justify-between w-full mx-auto">
                            <input className="text-xl w-full focus:outline-none ml-4" placeholder='name of the set...' 
                                value={search} onChange={handleSearchChange} onKeyDown={handleEnter}></input>
                        </div>
                        <button className="border-2 border-[var(--highlight-fuchsia)] rounded-xl bg-[var(--background)] text-[var(--highlight-fuchsia)] mx-2 p-2 font-bold 
                            hover:bg-[var(--highlight-fuchsia)] py-3 rounded-lg transition-colors hover:text-[var(--background)] hover:cursor-pointer"
                            onClick={updateSets}>Search</button>
                    </div>         
                </>
            )
}
export default Searchbar;