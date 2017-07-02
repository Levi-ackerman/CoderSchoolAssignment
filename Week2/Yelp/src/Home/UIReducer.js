
const initialState = {
  searchIndicator: false,
};

const ui = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_SEARCH_INDICATOR':
      return {
        ...state,
        searchIndicator: action.loading,
      };
    default:
      return state;
  }
};

//ui actions

export const searchIndicator = (loading) => ({
  type: 'SHOW_SEARCH_INDICATOR',
  loading
});

export default ui;
