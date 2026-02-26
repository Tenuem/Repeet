import { useContext, useEffect, useState, type JSX } from "react"
import FlashcardRevisions from "../Components/Flashcard/FlashcardRevisions"
import type { FlashcardGet } from "../Models/Flashcard.ts"
import { getFlashcardAPI, getFlashcardsByAuthorAPI } from "../Services/FlashcardService.tsx"
import { useAuthContext } from "../Context/authContext";
import { handleError } from "../Helpers/ErrorHandler.tsx";

type Props = {}

const RevisionRating = {
    Bad: 1,
    Ok: 2,
    Good: 3
};


const Revisions : React.FC<Props> = () : JSX.Element => {

    const [data, setData] = useState<FlashcardGet[]>([]);
    const [isAnswered, setIsAnswerd] = useState(false);
    const [totalRevisionsNumber, setTotalRevisionsNumber] = useState<number>(0);
    const [answeredCorrectlyNumber, setAnsweredCorrectlyNumber] = useState<number>(0);

    const { user } = useAuthContext();

    const handleFlashcardRevision = (rating: number, id:string) => {
        if (rating === RevisionRating.Good || rating === RevisionRating.Ok){
            if (data.length >= 0)
                setData(prev => prev.filter(item => item.id !== id));
            setAnsweredCorrectlyNumber(prev => prev + 1);
        }
        else {
            setData(prev => moveToEnd(prev, id));
        }
        //toggleIsAnwered();
    }

    const toggleIsAnwered = () => {
        setIsAnswerd(!isAnswered);
    }

    const moveToEnd = (array: FlashcardGet[], id: string): FlashcardGet[] => {
        const item = array.find(item => item.id === id);
        console.log(item);
        if (!item) return array;
        
        return [
            item,
            ...array.filter(i => i.id !== id)
        ];
    };
    
    useEffect(() => {

        // for the future only flashcards of a user to revise
        // all user's flashcards for now
        const getAllFlashcards = async () => {
            if (user)
                await getFlashcardsByAuthorAPI(user.username)
                .then((res) => {
                    if (res?.data) {
                        setData(res?.data);
                        setTotalRevisionsNumber(res?.data.length);
                    }
                })
                .catch((e) => {
                    setData([]);
                    handleError(e);
                }); 
        }
        getAllFlashcards(); 

    }, [])

    return (
        <>  
            {data && data.length > 0 ? (
                data.map((f) => {
                    return (                
                            <FlashcardRevisions key={f.id} id={f.id} keyword={f.keyword} definition={f.definition} 
                                handleRevision={handleFlashcardRevision} isAnswered={isAnswered} toggleIsAnwered={toggleIsAnwered} answered={answeredCorrectlyNumber} total={totalRevisionsNumber}/>  
                        )
                })
            ) : (
                <p className="text-center text-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute">All revisions done! Congratulations!</p>
            )}         
        </>
        
    )
}

export default Revisions;