import { useEffect, useState, type ChangeEvent, type JSX, type SyntheticEvent } from "react";
import { setDetailsGetAPI, setGetAPI } from "../Services/SetService";
import type { SetDetailedGet, SetGet } from "../Models/Set";
//import SetList from "../Components/Set/SetList";
import SetGrid from "../Components/Set/SetGrid";
import { useSearchParams } from "react-router-dom";
import SetDetails from "./SetDetails.tsx"
import Searchbar from "../Components/Layout/Searchbar.tsx";
import SetList from "../Components/Set/SetList.tsx";

type Props = {}

const Explore : React.FC<Props> = () : JSX.Element => {

    const [searchParams] = useSearchParams();
    const setid = searchParams.get('setid') || '';
    const hasQuery = setid.trim() !== '';
    
    const [setData, setSetData] = useState<SetDetailedGet | null>(null);
    const [searchValue, setSearchValue] = useState<string>("");
    const [searchedSets, setSearchedSets] = useState<SetGet[] | null>([]);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') 
            getSets(searchValue);
    }

    const updateSets = (e: SyntheticEvent) => {
        getSets(searchValue);
    }

    useEffect(() => {
        
        if (!hasQuery) {
            setSetData(null);
            getSets("");
            return;
        }

        const getDetailedSet = async () => {
            await setDetailsGetAPI(setid)
            .then((res) => {
                if (res?.data) {
                    setSetData(res?.data);
                    console.log(res?.data);
                }
            })
            .catch((e) => {
                setSetData(null);
                // handle error todo
                console.log(e);
            }); 
        }

        getDetailedSet();
    }, [setid, hasQuery]);

    const getSets = (nameQuery:string = "") => {
        setGetAPI(nameQuery)
        .then((res) => {
            if (res?.data) {
                setSearchedSets(res?.data);
                //console.log(res?.data);
            }
        })
        .catch((e) => {
            setSearchedSets(null);
            // handle error todo
            console.log(e);
        });   
    };

    return (
        <>
            {!hasQuery ? (
                <>
                    <Searchbar search={searchValue} handleSearchChange={handleSearch} handleEnter={handleKeyDown} updateSets={updateSets}/>
                    <SetGrid setArray={searchedSets}/>
                </>
            ) : setData ? (
                    <SetDetails set={setData} />
                ) : (
                    <p className="text-center text-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute">This element does not exist</p>
            )
            }
        </>
    )
}
export default Explore;