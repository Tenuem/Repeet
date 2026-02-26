import React, { useState, type ChangeEvent, type JSX } from "react";

type Props = {
    id: string,
    keyword: string,
    definition: string,
    isAnswered: boolean,
    handleRevision: (rating: number, id: string) => void;
    toggleIsAnwered: () => void;
    answered: number;
    total: number;
};

// swipe'y fiszek
const FlashcardRevisions : React.FC<Props> = ({id, keyword, definition, isAnswered, handleRevision, toggleIsAnwered, answered, total}: Props) : JSX.Element => {
    const [answer, setAnswer] = useState<string>("");
    const [hints, setHints] = useState<number>(0);
    const [borderStyle, setBorderStyle] = useState<string>("");
    const [animation, setAnimation] = useState<React.CSSProperties>({});

    const [correctSubstring, setCorrectSubstring] = useState<string>("");
    const [incorrectSubstring, setInorrectSubstring] = useState<string>("");

    const handleAnswerChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        if (e.target.value.includes('0')){
            let correct = findCommonStart(answer, definition);
            if (correct.length >= definition.length - 1)
                checkAnswer(true);
            else {
                setAnswer(correct + definition.charAt(correct.length))
                setHints(prev => prev+1);
            }   
        }
        else
            setAnswer(e.target.value);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter')
        {
            checkAnswer();
        }
    }
    
    const animateAfterRevision = (rating: number, id:string) => {
        if (rating > 1){
            setAnimation({
                transform: 'translateX(1200px) rotate(20deg)',
                transition: 'all 250ms ease-out'
            });
            
        } else {
            setAnimation({
                transform: 'translateX(-1200px) rotate(-30deg)',
                transition: 'all 250ms ease-out'
            });
        }   
            
        setHints(0);
        setBorderStyle("");
        setAnswer("");
        toggleIsAnwered();
        // animation time
        setTimeout(() => setAnimation({}), 250);
        setTimeout(() => handleRevision(rating, id), 250);
    }

    const checkAnswer = (lastLetter: Boolean = false) => {

        toggleIsAnwered();

        let differences = answer.length === definition.length ? countStringDifferences(answer, definition) : -1;
        // if there is one char lenght of difference (shorter or longer)
        // but the substring is equal
        if ((answer.length === definition.length + 1 || answer.length + 1 === definition.length) && 
            (countStringDifferences(answer, definition) === 0 && countStringDifferences(definition, answer) === 0))
            differences = 1;

        let hintCount = hints;
        let correct = definition;
        if (!lastLetter){
            correct = findCommonStart(answer, definition);
            console.log(typeof(correct), answer, definition);
            setCorrectSubstring(correct);
            if (differences === 0)
                setInorrectSubstring("");
            else
                setInorrectSubstring(answer.slice(correct.length))
        } else {
            // the last hint not added if it was the last letter
            hintCount = hints + 1;
            setCorrectSubstring(definition);
            setInorrectSubstring("");
        }
        
        if (hintCount > 1) 
            setBorderStyle("border-red-500 border-3");
        else if (hintCount == 0)
        {
            if (differences === 0)
                setBorderStyle("border-[var(--highlight-mint)] border-3");
            else if (differences === 1)
                setBorderStyle("border-orange-500 border-3");
            else 
                setBorderStyle("border-red-500 border-3");
        }
        else if (hintCount == 1 && (differences == 0 || (lastLetter && differences == 1)))
            setBorderStyle("border-orange-500 border-3");
        else 
            setBorderStyle("border-red-500 border-3");
    }      


    function findCommonStart(str1: string, str2: string): string {
        let common = '';
        const maxLength = Math.min(str1.length, str2.length);
        
        let i = 0;
        for (; i < maxLength; i++) {
            if (str1[i].toLowerCase() === str2[i].toLowerCase()) {
                common += str1[i];
            } else 
                break;
        }
        return str2.slice(0,i);
    }

    function countStringDifferences(str1: string, str2: string): number {
        let common = '';
        const maxLength = Math.min(str1.length, str2.length);
        
        let i = 0;
        let dif = 0;
        for (; i < maxLength; i++) {
            if (str1[i].toLowerCase() === str2[i].toLowerCase()) {
                common += str1[i];
            } else 
                dif = dif+1;
        }
        return dif;
    }

    return (
        <div className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute flex flex-col w-4/5 h-3/5 items-center justify-center">
            <>
            <h2 className="text-[var(--foreground)] opacity-30 text-base md:text-xl w-full md:w-5/7 xl:w-2/5 text-right mx-auto pr-3">correct: {answered}/{total}</h2>

            <div style={animation} className={`rounded-2xl flex flex-col items-center justify-center shadow-xl ${borderStyle}
                            aspect-[4/5] w-full
                            md:aspect-[7/4] sm:w-7/10 md:w-5/7 xl:w-2/5
                            my-5 text-[var(--background)] bg-[var(--foreground)]`}>

                <div className='flex items-center justify-center w-full h-1/2 py-2'>
                    <h2 className='italic text-3xl sm:text-4xl justify-between'>{keyword}</h2>
                </div>

                <hr className={`border-t border-[var(--background)] w-4/5`} />

                {!isAnswered ? (
                    <input className="text-2xl sm:text-3xl w-3/5 focus:outline-none h-1/2 py-2" 
                        placeholder='Answer' value={answer} onChange={handleAnswerChange} onKeyDown={handleKeyDown}></input>
                ) : (
                    <div className="flex flex-col justify-center w-3/5 h-1/2 py-2">
                        <div className="flex">
                            <h2 className='text-2xl sm:text-3xl'>{correctSubstring}</h2>
                            <h2 className='text-2xl sm:text-3xl text-red-500'>{incorrectSubstring}</h2>
                        </div>
                        <div>
                            {correctSubstring !== definition && (
                                <h2 className='text-2xl sm:text-3xl'>{definition}</h2>
                            )} 
                        </div>                
                    </div>
                )}
            </div>
            
                <div className="flex w-full items-center justify-between h-1/5 md:w-5/7 xl:w-2/5">
                {isAnswered && (
                    <>
                    <button onClick={() => animateAfterRevision(1, id)} className="bg-red-500 rounded-3xl text-[var(--background)] py-2
                        text-lg w-1/3">Bad</button>
                    <button onClick={() => animateAfterRevision(2, id)} className="bg-orange-500 w-1/3 rounded-3xl text-xl text-[var(--background)] py-2 mx-2">Almost</button>
                    <button onClick={() => animateAfterRevision(3, id)} className="bg-[var(--highlight-mint)] w-1/3 rounded-3xl text-xl text-[var(--background)] py-2">Good</button>
                    </>
                )}
                </div>
            
            </>
        </div>
    )
}

export default FlashcardRevisions;
