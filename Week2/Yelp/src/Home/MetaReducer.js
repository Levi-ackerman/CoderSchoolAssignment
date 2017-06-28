import { UPDATE_META } from './ActionType';


const initialState = {
  term: '',
  categories: '',
  openNow: false,
  location: 'San Francisco',
};

const meta = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_META:
      return {
        ...state,
        ...action.meta
      };
    default:
      return state;
  }
};

export default meta;
