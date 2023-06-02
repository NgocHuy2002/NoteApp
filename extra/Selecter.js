import { createSelector } from "reselect";

const getNotes = (state) => state.notes.notes;
const getKeyword = (state) => state.notes.searchKeyword;
const getRoute = (state) => state.notes.route;

export const getFilteredItems = createSelector(
  [getNotes, getKeyword, getRoute],
  (notes, word, route) => {
    if (word) {
      let searchKey = notes.filter((note) => {
        if (route == "Favorite") {
          return (
            (note.favorite === true &&
              note.text
                .trim()
                .toLowerCase()
                .includes(word.trim().toLowerCase())) ||
            (note.favorite === true &&
              note.title
                .trim()
                .toLowerCase()
                .includes(word.trim().toLowerCase()))
          );
        } else {
          return (
            note.text
              .trim()
              .toLowerCase()
              .includes(word.trim().toLowerCase()) ||
            note.title
               .trim()
               .toLowerCase()
               .includes(word.trim().toLowerCase())
          );
        }
      });
      return searchKey;
    } else {
      if (route == "Favorite") {
        return notes.filter((note) => note.favorite === true);
      } else {
        return notes;
      }
    }
  }
);
export const getFilteredItemsWithDone = createSelector(
  [getNotes, getKeyword, getRoute],
  (notes, word, route) => {
    if (word) {
      let searchKey = notes.filter((note) =>{
         if (route == "Favorite") {
            return (
              (note.favorite === true &&
                note.text
                  .trim()
                  .toLowerCase()
                  .includes(word.trim().toLowerCase())) && note.status == true ||
              (note.favorite === true &&
                note.title
                  .trim()
                  .toLowerCase()
                  .includes(word.trim().toLowerCase())) && note.status == true
            );
          }else{
            return (
               (note.text
                   .trim()
                   .toLowerCase()
                   .includes(word.trim().toLowerCase())) && note.status == true ||
               (note.title
                   .trim()
                   .toLowerCase()
                   .includes(word.trim().toLowerCase())) && note.status == true
             );
          }
      });
      return searchKey;
    } else {
      if (route == "Favorite") {
        return notes.filter((note) => note.favorite === true && note.status === true);
      } else {
        return notes.filter((note) => note.status === true);
      }
    }
  }
);
