import { ActionType } from './action';

function filterReducer(filter = '', action = {}) {
  switch (action.type) {
    case ActionType.TOGGLE_FILTER:
      if (filter === action.payload.category) return '';
      return action.payload.category;
    default:
      return filter;
  }
}

export default filterReducer;
