import {GET_POSTS} from "../actions/post.actions";

const initiealState = {};

export default function postReducer(state = initiealState, action){
    switch (action.type){
        case GET_POSTS:
            return action.payload
        default:
            return state;
    }
}