// src/actions/noteActions.js
export const addNote = (note) => {
  return {
    type: 'ADD_NOTE',
    payload: note,
  };
};
export const editNote = (note) => {
  return {
    type: 'EDIT_NOTE',
    payload: note,
  };
};
export const deleteNote = (id) => {
  return {
    type: 'DELETE_NOTE',
    payload: id,
  };
};
export const setSearchKeyword = (keyword) => ({
  type: 'SET_SEARCH_KEYWORD',
  payload: keyword,
});
export const setRoute = (route) => ({
  type: 'SET_ROUTE',
  payload: route,
});
