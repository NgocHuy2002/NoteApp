const initialState = {
  notes: [],
  favorites: [],
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return {
        ...state,
        notes: [...state.notes, action.payload],
        favorites: state.favorites.filter((favorite) => favorite.id !== action.payload.id),
      };
    case 'EDIT_NOTE':
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload : note),
        favorites: state.favorites.map((favorite) =>
          favorite.id === action.payload.id ? action.payload : note),
      };
    case 'DELETE_NOTE':
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    case 'ADD_FAVORITE':
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload.id),
        favorites: [...state.favorites, action.payload],
      }
    default:
      return state;
  }
};

export default noteReducer;