import * as characterActions from "./characterActionTypes";

const INITIAL_STATE: CharactersState = {
    characters: [],
};
  
const characterReducer = (state = INITIAL_STATE, action: CharacterAction) => {
    switch (action.type) {
        case characterActions.GET_CHARACTERS:
            return {
                characters: action.payload,
            };
        case characterActions.MORE_CHARACTERS:
            return {
                ...state,
                characters: action.payload,
            };
        default:
        return state;
    }
};

export default characterReducer;
  