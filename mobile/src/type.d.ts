type Character = {
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: {
        name: string,
        url: string,
    },
    location: {
        name: string,
        url: string,
    },
    image: string,
    episode: Array<string>,
    url: string,
    created: string,

};

type CharactersState = {
    characters: Character[];
}


type CharacterAction = {
    type: string,
    payload: CharactersState,
}

type DispatchType = (args: CharacterAction) => CharacterAction;