import {
  ACTIVE_SELECT,
} from '../actionType';

export default function selectList(state = 'ci', action) {
  switch (action.type) {
    case ACTIVE_SELECT:
        return action.value;
    default:
      return state;
  }
}
