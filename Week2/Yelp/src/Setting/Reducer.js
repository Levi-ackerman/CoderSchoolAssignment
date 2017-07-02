import {
  CREATE_EDITING_SETTING,
  UPDATE_DISTANCE,
  UPDATE_SORT_BY,
  UPDATE_CATEGORIES,
} from './ActionType';

const initialState = {
  distance: undefined,
  sortBy: undefined,
  category: [],
};

export const editSetting = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type){
    case CREATE_EDITING_SETTING:
      return payload;
    case UPDATE_DISTANCE:
      return {
        ...state,
        distance: payload,
      };
    case UPDATE_SORT_BY:
      return {
        ...state,
        sortBy: payload,
      };
    case UPDATE_CATEGORIES:
      return {
        ...state,
        distance: payload,
      };
  }
  return state;
};
