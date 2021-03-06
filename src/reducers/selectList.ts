import {
  ACTIVE_SELECT,
  ADD_SELECT_LIST,
  FETCH_SELECT_LIST_BEGIN,
  FETCH_SELECT_LIST_SUCCESS,
  FETCH_SELECT_LIST_FAILURE,
} from '../actionType';

export default function selectList(state = [], action) {
  switch (action.type) {
    /*case ACTIVE_SELECT:
        return {
            ...state,
            activeSelect: action.value
        };*/
    case ADD_SELECT_LIST:
      return [
        ...state,
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          text: action.value
        }
      ];
      /*return {
        ...state,
        loading: false,
        items: action.selectList
      };*/
    case FETCH_SELECT_LIST_BEGIN:
      return [];
    case FETCH_SELECT_LIST_SUCCESS:
      return [...state].concat(action.selectList);
    case FETCH_SELECT_LIST_FAILURE:
      return [];
    default:
      return state;
  }
}
