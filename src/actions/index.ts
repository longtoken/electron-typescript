import {
  FETCH_RENDER_CONTENT_SUCCESS,
  DELETE_CONTENT,
  ACTIVE_SELECT,
  ADD_SELECT_LIST,
  FETCH_SELECT_LIST_BEGIN,
  FETCH_SELECT_LIST_FAILURE,
  FETCH_SELECT_LIST_SUCCESS,
} from '../actionType'

//import axios from 'axios'
import Base64 from 'Base64'

export const addSelectAction = (value) => {
  return ({
    type: ADD_SELECT_LIST,
    value,
  });
};

const data = [
  {
    key: 1,
    account: '15898987777',
    env: 'ci',
    token: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  }
];

export const renderContent = (data, phone, env) => {
  return ({
    type: FETCH_RENDER_CONTENT_SUCCESS,
    data,
    phone,
    env,
  });
};

export const deleteContentItem = (id) => {
  return ({
    type: DELETE_CONTENT,
    id
  });
};


export function addSelectListItem(value) {
  return dispatch => {
    dispatch(setActiveSelect(value));
    dispatch(addSelectAction(value));
  };
}


const symbol = (function () {
  let count = 0;
  return function (phone) {
    count++;
    return `@@__${phone}_${count}`;
  };
})();


export function getContentList(phone, environment) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let tokenList = symbol(phone);
        console.log(tokenList,'---token');
        dispatch(renderContent({id: tokenList}, phone, environment));
      }, 100);
    });
  };
}


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
        dispatch(setActiveSelect(json[0].text));
        dispatch(fetchSelectListSuccess(json));
      }, 100);
    });
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

export const setActiveSelect = value => ({
  type: ACTIVE_SELECT,
  value
});

