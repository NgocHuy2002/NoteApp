import { createSelector } from 'reselect';


export const getFilteredItems = createSelector(
   [state => state.notes.notes], (notes) =>
   (notes.filter(note => note.favorite === true))
);
export const getItems = createSelector(
   [state => state.notes.notes], (notes) =>
   (notes.filter(note => note.favorite === false))
);
