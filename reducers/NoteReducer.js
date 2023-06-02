const initialState = {
  notes: [],
  searchKeyword: "",
  route:'',
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    case 'EDIT_NOTE':
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload : note),
      };
    case 'DELETE_NOTE':
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    case 'SET_SEARCH_KEYWORD':
      return {
        ...state,
        searchKeyword: action.payload,
      };
      case 'SET_ROUTE':
        return {
          ...state,
          route: action.payload,
        };
    default:
      return state;
  }
};

export default noteReducer;
