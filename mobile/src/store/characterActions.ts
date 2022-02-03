import * as actionTypes from './characterActionTypes';
import api from '../services/api';

export const getCharactersByPage = (page: number) => async (dispatch: DispatchType) => {
    try {
        api.get('/characters', {
            params: {
                page,
            }
        })
        .then(response => {
            console.log(response);
        })
    } catch (error) {
        console.log(error);
    }
};



  