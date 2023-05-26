import { createSelector } from 'reselect';


export const getFilteredItems = createSelector(
   [state => state.notes.notes], (notes) =>
   (notes.filter(note => note.favorite === true))
);

