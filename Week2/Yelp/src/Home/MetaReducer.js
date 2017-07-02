import { UPDATE_META } from './ActionType';


const initialState = {
  term: '',
  categories: [{title: 'xxxx'},{ title: 'yyyzzz'}],
  location: 'San Francisco',
  distance: { name: '1 km', value: 1000,},
  sortBy: { name: 'Best match', value: 'best_match'},
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
