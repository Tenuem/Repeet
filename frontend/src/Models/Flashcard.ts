export type FlashcardGet = {
    id: string;
    keyword: string;
    definition: string
};

export type FlashcardPost = {
    keyword: string,
    definition: string,
    setId: string
}

export type FlashcardPut = {
    keyword: string,
    definition: string
}