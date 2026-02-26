import type { FlashcardGet } from "./Flashcard";

export type SetGet = {
    id: string;
    name: string;
    authorUsername: string;
};

export type SetPost = {
    name: string
}

export type SetPut = {
    name: string
}

export type SetDetailedGet = {
    id: string;
    name: string;
    authorUsername: string;
    flashcards: FlashcardGet[];
}