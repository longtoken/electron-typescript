import {
    ADD_SELECT_LIST,
    FETCH_SELECT_LIST_BEGIN,
    FETCH_SELECT_LIST_FAILURE,
    FETCH_SELECT_LIST_SUCCESS,
} from '../actionType'

import {ActionCreator, AnyAction} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
//export type Thunk = ThunkAction<void, AppState, null, AppAction>;
//export type Dispatch<S> = ThunkDispatch<S, null, AppAction>;

let initSelect = [];

export const addSelectList = (value) => ({
    type: ADD_SELECT_LIST,
    id: initSelect.length++,
    text: value,
});


/*export const fetchSelectList: ActionCreator<
    ThunkAction<Promise<any>, {}, null, AnyAction>
    > = () => {
  return (dispatch) => {
    dispatch(fetchSelectListBegin());
    return fetch('../mock/selectList.json')
        .then(res => res.json())
        .then(json => {
          dispatch(fetchSelectListSuccess(json));
          initSelect = json;//ke
          return json;
        })
        .catch(error => dispatch(fetchSelectListFailure(error)));
  };
}*/

export function fetchSelectList() {
    return dispatch => {
        dispatch(fetchSelectListBegin());
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let json = [
                    {"id": 0, "text": "ci"},
                    {"id": 1, "text": "uat"},
                    {"id": 2, "text": "uata"}
                ];
                initSelect = json;
                dispatch(fetchSelectListSuccess(json));
            }, 100);
        });
        /*return fetch('../mock/selectList.json')
            .then(res => res.json())
            .then(json => {
                dispatch(fetchSelectListSuccess(json));
                initSelect = json;//ke
                return json;
            })
            .catch(error => dispatch(fetchSelectListFailure(error)));*/
    };
}

export const fetchSelectListBegin = () => ({
    type: FETCH_SELECT_LIST_BEGIN
});

export const fetchSelectListSuccess = json => ({
    type: FETCH_SELECT_LIST_SUCCESS,
    selectList: json
});

export const fetchSelectListFailure = error => ({
    type: FETCH_SELECT_LIST_FAILURE,
    error
});


