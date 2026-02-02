import React, { useState, type ChangeEvent, type JSX } from "react";

type Props = {
    keyword: string;
    definition: string;
};
// swipe'y fiszek
const FlashcardRevisions : React.FC<Props> = ({keyword, definition}: Props) : JSX.Element => {
    const [answer, setAnswer] = useState<string>("");
    const [isAnswered, setIsAnswerd] = useState(false);
    const [hints, setHints] = useState<number>(0);
    const [borderStyle, setBorderStyle] = useState("");

    const [correctSubstring, setCorrectSubstring] = useState<string>("");
    const [incorrectSubstring, setInorrectSubstring] = useState<string>("");

    const handleAnswer = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        if (e.target.value.includes('0')){
            let correct = findCommonStart(answer, definition);
            if (correct.length == definition.length - 1)
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

    const checkAnswer = (lastLetter: Boolean = false) => {

        setIsAnswerd(true);
        let correct = definition;
        if (!lastLetter){
            correct = findCommonStart(answer, definition);
            setCorrectSubstring(correct);
            setInorrectSubstring(answer.replace(correct, ""));
        }
        let hintCount = lastLetter ? hints + 1 : hints;

        if (hintCount > 1 || correct != definition || answer.length > definition.length)
            setBorderStyle("border-red-500 border-3");
        else {
            if (hintCount == 0)
                setBorderStyle("border-[var(--highlight-mint)] border-3");
            if (hintCount == 1)
                setBorderStyle("border-orange-500 border-3");
        }
        console.log(hintCount);        
    }

    function findCommonStart(str1: string, str2: string): string {
        let common = '';
        const maxLength = Math.min(str1.length, str2.length);
        
        for (let i = 0; i < maxLength; i++) {
            if (str1[i] === str2[i]) {
            common += str1[i];
            } else 
                break;
        }
        return common;
    }

    return (
        <div className={`rounded-2xl flex flex-col items-center justify-center p-6 shadow-xl ${borderStyle}
                        aspect-[7/4] w-2/5
                        top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute text-[var(--foreground)]`}>
            <div className='flex items-center justify-center w-full'>
                <h2 className='italic text-4xl justify-between'>{keyword}</h2>
            </div>
            <hr className={`border-t border-[var(--foreground)] my-10 w-4/5`} />
            {!isAnswered ? (
                <input className="text-3xl w-3/5 focus:outline-none " placeholder='Answer' value={answer} onChange={handleAnswer} onKeyDown={handleKeyDown}></input>
            ) : (
                <div className="flex flex-col justify-left w-3/5">
                    <div className="flex">
                        <h2 className='text-3xl'>{correctSubstring}</h2>
                        <h2 className='text-3xl text-red-500'>{incorrectSubstring}</h2>
                    </div>
                    <div>
                        {correctSubstring !== definition && (
                            <h2 className='text-3xl'>{definition}</h2>
                        )} 
                    </div>                
                </div>
            )}
        </div>
    )
}

export default FlashcardRevisions;
