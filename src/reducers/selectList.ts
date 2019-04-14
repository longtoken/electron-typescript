import {
    ADD_SELECT_LIST,
    FETCH_SELECT_LIST_BEGIN,
    FETCH_SELECT_LIST_SUCCESS,
    FETCH_SELECT_LIST_FAILURE,
} from '../actionType'


const initialState = {
    items: [],
    loading: false,
    error: null
};

export default function selectList(state = initialState, action) {
    switch(action.type) {
        case ADD_SELECT_LIST:
            console.log({id:action.id,text: action.text},'11');
            return {
                ...state,
                loading: false,
                items: [{id:action.id,text: action.text}]
            };
        case FETCH_SELECT_LIST_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_SELECT_LIST_SUCCESS:
            console.log('--------success');
            return {
                ...state,
                loading: false,
                items: action.selectList
            };
        case FETCH_SELECT_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
                items: []
            };

        default:
            return state;
    }
}
