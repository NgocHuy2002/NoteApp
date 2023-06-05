import { createSelector } from "reselect";
import { Compare } from "./Compare";

const getNotes = (state) => state.notes.notes;
const getRoute = (state) => state.notes.route;

export const getFilteredItems = createSelector(
  [
    getNotes,
    getRoute,
    (state, keyword, filterStatus) => keyword,
    (state, keyword, filterStatus) => filterStatus,
  ],
  (notes, route, keyword, filterStatus) => {
    if (filterStatus == false) {
      if (keyword !== "") {
        let searchKey = notes.filter((note) => {
          if (route == "Favorite") {
            return (
              (note.favorite == true && Compare(note.text, keyword)) ||
              (note.favorite == true && Compare(note.title, keyword))
            );
          } else {
            return Compare(note.text, keyword) || Compare(note.title, keyword);
          }
        });
        return searchKey;
      } else {
        if (route == "Favorite") {
          return notes.filter((note) => note.favorite == true);
        } else {
          return notes;
        }
      }
    } else {
      if (keyword !== "") {
        let searchKey = notes.filter((note) => {
          if (route == "Favorite") {
            return (
              (note.favorite == true && note.status == true && Compare(note.text, keyword)) ||
              (note.favorite == true && note.status == true && Compare(note.title, keyword))
            );
          } else {
            return note.status == true && Compare(note.text, keyword) || note.status == true && Compare(note.title, keyword);
          }
        });
        return searchKey;
      } else {
        if (route == "Favorite") {
          return notes.filter((note) => note.favorite == true && note.status == true);
        } else {
          return notes.filter((note) => note.status == true);
        }
      }
    }
  }
);
