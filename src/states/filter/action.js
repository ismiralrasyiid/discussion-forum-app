const ActionType = {
  TOGGLE_FILTER: 'TOGGLE_FILTER',
};

function toggleFilterActionCreator(category) {
  return {
    type: ActionType.TOGGLE_FILTER,
    payload: {
      category,
    },
  };
}

export { ActionType, toggleFilterActionCreator };
