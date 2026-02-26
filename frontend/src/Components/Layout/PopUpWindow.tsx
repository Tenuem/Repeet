import { useState, type JSX } from "react";
import CreateForm from "./CreateForm";
import { addSetAPI } from "../../Services/SetService";
import { toast } from "react-toastify";
import { addFlashcardApi } from "../../Services/FlashcardService";
import { handleError } from "../../Helpers/ErrorHandler";

interface Props {
    setBlur: (val: boolean) => void;
}

const CreateNewPopUpWindow : React.FC<Props> = ({ setBlur } : Props) : JSX.Element => {
  const createNewSetString = "createNew";
  const [selectedSetId, setSelectedSetId] = useState<string>(createNewSetString);  

  // logic for submitting new data from a pop-up window
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    const setId = e.target[0].value;
    const setName = isNewSet() ? e.target[1].value : setId;
    const numOfFlashcards = setId === setName ?  // if it is one existing already then there is only one field consisting of its name only
          (e.target.length - 3)/3 : (e.target.length - 2)/3; // every flashcard consist of 3 fields in the form

    let setData = null;
    if (isNewSet()){
      await addSetAPI(setName)
        .then((res) => {
            if (res?.status === 201) {
                toast.success("New set added!");
                setData = res?.data;
                //console.log(res?.data);
            }
        })
        .catch((e) => {
            handleError(e);
        });
    }

    // add each flashcard to the set
    const set = !isNewSet() ? selectedSetId : setData!.id;
    const startIndex = !isNewSet() ? 1 : 2;
    console.log(startIndex);
    for (let i=0; i<numOfFlashcards; i++){
      const keyword = e.target[startIndex + i*3].value;
      const definition = e.target[startIndex + i*3 + 1].value;
      console.log(keyword, definition);
      await addFlashcardApi(keyword, definition, set);
    }
    setBlur(false);
  }

  const isNewSet = () => {
    return selectedSetId === createNewSetString ? true : false;
  }

  return (
    <CreateForm setBlur={setBlur} handleOnFormSubmit={handleSubmit} setSelectedSetId={setSelectedSetId} isNewSet={isNewSet} newSetString={createNewSetString}/>
  )
};
export default CreateNewPopUpWindow;