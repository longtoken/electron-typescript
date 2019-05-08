import {
  DELETE_CONTENT,
  FETCH_RENDER_CONTENT_SUCCESS,
} from '../actionType'

export default function contentList(state = [], action) {
  switch (action.type) {
    case FETCH_RENDER_CONTENT_SUCCESS:
      return [
        ...state,
        {
          key: state.reduce((maxId, todo) => Math.max(todo.key, maxId), -1) + 1,
          account: action.phone,
          env: action.env,
          token: action.data,
          description: action.data,
          del: action.data,
        }
      ];
    case DELETE_CONTENT:
      return state.filter(item => {
          return item.token.id !== action.id
        }
      );
    default:
      return state;
  }
}
