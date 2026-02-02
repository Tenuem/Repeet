import type { JSX } from "react"
import FlashcardRevisions from "../Components/Flashcard/FlashcardRevisions"

type Props = {}

const Revisions : React.FC<Props> = (props) : JSX.Element => {
    return (
        <FlashcardRevisions keyword='katastrofa' definition='masakra'/>
    )
}

export default Revisions;