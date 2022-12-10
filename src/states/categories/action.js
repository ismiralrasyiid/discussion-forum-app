const ActionType = {
  SET_CATEGORIES: 'SET_CATEGORIES',
};

function setCategoriesActionCreator(categories) {
  return {
    type: ActionType.SET_CATEGORIES,
    payload: {
      categories,
    },
  };
}

export { ActionType, setCategoriesActionCreator };
