import { combineReducers } from 'redux';
import todosReducer from './todos';
import visibilityFilter from './filter';

export default combineReducers({
  todosReducer,
  visibilityFilter,
});
