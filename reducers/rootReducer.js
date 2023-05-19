import { combineReducers } from 'redux';
import noteReducer from './NoteReducer';


const rootReducer = combineReducers({
  notes: noteReducer,
});

export default rootReducer;