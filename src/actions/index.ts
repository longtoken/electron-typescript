import {
  FETCH_RENDER_CONTENT_SUCCESS,
  DELETE_CONTENT,
  ACTIVE_SELECT,
  ADD_SELECT_LIST,
  FETCH_SELECT_LIST_BEGIN,
  FETCH_SELECT_LIST_FAILURE,
  FETCH_SELECT_LIST_SUCCESS,
} from '../actionType'

import axios from 'axios'

//import {ActionCreator, AnyAction} from 'redux';
//import {ThunkAction, ThunkDispatch} from 'redux-thunk';
//export type Thunk = ThunkAction<void, AppState, null, AppAction>;
//export type Dispatch<S> = ThunkDispatch<S, null, AppAction>;

let initSelect = [];

export const addSelectAction = (value) => {
  initSelect.unshift({id: initSelect.length++, text: value});
  return ({
    type: ADD_SELECT_LIST,
    selectList: initSelect
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
let contentList = [];
export const renderContent = (data, phone, env) => {
  console.log(contentList, contentList.length, 'aaaaaa');
  /*contentList = [
    {
      key: contentList.length++,
      account: phone,
      env,
      token: data.access_token,
      description: data.access_token
    }
  ];*/
  //为什么用push会多一个empty
  let cpContentList = JSON.parse(JSON.stringify(contentList));
  let item = {
    key: cpContentList.length++,
    account: phone,
    env,
    token: data.access_token,
    description: data.access_token,
    del: phone
  };

  cpContentList.push(item);
  contentList.push(item);
  console.log(contentList, cpContentList, 'axios=====');

  for (let i = 0; i < cpContentList.length; i++) {
    if (!cpContentList[i]) {
      cpContentList.splice(i, 1);
    }
  }
  for (let i = 0; i < contentList.length; i++) {
    if (!contentList[i]) {
      contentList.splice(i, 1);
    }
  }
  return ({
    type: FETCH_RENDER_CONTENT_SUCCESS,
    json: cpContentList
  });
};

export const deleteContentItem = (phone) => {

  for (let i = 0; i < contentList.length; i++) {
    if (contentList[i].account === phone) {
      contentList.splice(i, 1);
    }
  }
  console.log(phone, '----', contentList);
  return ({
    type: DELETE_CONTENT,
    json: contentList
  });
};


export function addSelectList(value) {
  return dispatch => {
    dispatch(setActiveSelect(value));
    dispatch(addSelectAction(value));
  };
}

// mock
let tokenList = {
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZjgwODA4MTY5NGNjNGMyMDE2YTBmMWFiMDM3MDAyMSIsImV4cCI6MTU1NTM1NzI2NCwidXNlcl9uYW1lIjoiMTM2Nzc3Nzc3NzMiLCJqdGkiOiI2MzEwMTNkOS0wZDRiLTQzMDQtODBkZi05NTIzN2IzMWJiYTUiLCJjbGllbnRfaWQiOiJhcHBfY29yZSIsInNjb3BlIjpbImFsbCJdfQ.VQDGAHP95DQ8Usmm7THBwIKmbR2onM-ewv2ns2_996JnIl9puCYITe2gwJd3ajdaWTL-IaN0dwmkcEI5Yarj6egDGmH1ZTb-ElR2I1zreO5hWgAjMmYvdERmerLI5Z27TEVUV6WXlTkS4GDoACU9Utv8b_E5NkX0KzjfZJIdlZs",
  "token_type": "bearer",
  "refresh_token": "631013d9-0d4b-4304-80df-95237b31bba5",
  "expires_in": 35999,
  "scope": "all"
};

export function getContentList(phone, environment) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        dispatch(renderContent(tokenList, phone, environment));
      }, 100);
    });
  };
}

/*export function getContentList(phone, environment) {
  return dispatch => {
    if (environment !== 'pro') {
      environment = `-${environment}`;
    }
    let url = `https://passport${environment}.crfchina.com/auth_server/client/simplelogin`;
    let data = {
      'accountName': phone,
    };
    let Authorization = environment ? 'Basic YXBwX2NvcmU6YXBwX2NvcmU=' : 'Basic YXBwX2NvcmU6UkxDTkhYdGZFaThOaG9HSw==';
    let config = {
      headers: {
        'content-type': 'application/json',
        'Authorization': Authorization
      }
    };
    axios.post(url, data, config)
      .then((response) => {
        dispatch(renderContent(response, phone, environment));
        console.log(response);
      })
      .catch((error) => {

        console.log(error);
      });
  };
}*/


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
        dispatch(setActiveSelect(json[0].text));
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

export const setActiveSelect = value => ({
  type: ACTIVE_SELECT,
  value
});

