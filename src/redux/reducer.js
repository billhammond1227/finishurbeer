import defaultRoom from '../data/room';
import { combineReducers } from "redux";

function room(state = defaultRoom, action){
    switch(action.type){
        case 'ADD_ROOM': return action.room
        case 'LOAD_ROOM': return action.room
        case 'CHECK_IN': return action.room
        default: return state
    }
}

function dares(state = [], action){
    switch(action.type){
        case 'LOAD_DARES': return action.dares
        default: return state
    }
}

function gallery(state = [], action){
    switch(action.type){
        case 'LOAD_GALLERY': return [...state, action.gallery]
        default: return state
    }
}

const rootReducer = combineReducers({room, dares, gallery});

export default rootReducer