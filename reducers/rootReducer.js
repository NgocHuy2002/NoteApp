import { combineReducers } from 'redux';
import noteReducer from './Notereducer';


const rootReducer = combineReducers({
  notes: noteReducer,
});

export default rootReducer;