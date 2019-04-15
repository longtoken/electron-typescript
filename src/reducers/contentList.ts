import {
  FETCH_RENDER_CONTENT_SUCCESS,
} from '../actionType'


const initialState = {
  list: [],
  loading: false,
  error: null
};

export default function contentList(state = initialState, action) {
  switch(action.type) {
    case FETCH_RENDER_CONTENT_SUCCESS:
      return {
        ...state,
        list: action.json
      };

    default:
      return state;
  }
}
