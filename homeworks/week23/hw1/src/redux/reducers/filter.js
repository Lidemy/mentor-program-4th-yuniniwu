import { FILTER_TODO } from '../actionTypes';
import { VISIBILITY_FILTERS } from '../../constants/filterButton';

const initialState = VISIBILITY_FILTERS.ALL;

const visibilityFilter = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_TODO: {
      return action.payload.filter;
    }
    default: {
      return state;
    }
  }
};

export default visibilityFilter;
