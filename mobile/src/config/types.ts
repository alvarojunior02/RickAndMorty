import { ImageSourcePropType } from "react-native";

export type TypeCharacter = {
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

export type TypeEpisode = {
    id: number,
    name: string,
    air_date: string,
    episode: string,
    characters: Array<string>,
    url: string,
    created: string,
};