import { createSelector } from "reselect";
import { Compare } from "./Compare";
import moment from "moment";

const getNotes = (state) => state.notes.notes;
const startOfWeek = moment(Date.now()).startOf("week");
const endOfWeek = moment(Date.now()).endOf("week");
const startOfMonth = moment().startOf("month");
const endOfMonth = moment().endOf("month");
export const getFilteredItems = createSelector(
  [getNotes, (state, options) => options],
  (notes, options) => {
    // ---------------- SEND NOTES TO FILTER
    const filterNotes = notes.filter((note) => {
      if (!options.favorite && !options.filterStatus) {
        return true;
      } else if (!options.favorite && options.filterStatus) {
        return note.status === true;
      } else if (options.favorite && !options.filterStatus) {
        return note.favorite === true;
      } else if (options.favorite && options.filterStatus) {
        return note.status === true && note.favorite === true;
      }
      //  else {
      //   switch (options.filterDate) {
      //     case "T":
      //       return (
      //         moment(note.id).format("Do MMMM YYYY") ===
      //         moment(Date.now()).format("Do MMMM YYYY")
      //       );
      //     case "TW":
      //       return (
      //         moment(note.id).isSameOrAfter(startOfWeek) &&
      //         moment(note.id).isSameOrBefore(endOfWeek)
      //       );
      //     case "LW":
      //       return moment(note.id).isSameOrBefore(startOfWeek);
      //     case "TM":
      //       return (
      //         moment(note.id).isSameOrAfter(startOfMonth) &&
      //         moment(note.id).isSameOrBefore(endOfMonth)
      //       );
      //   }
      // }
    });
    // ---------------- FILTER THE FILTERED NOTE
    const filteredNotes = filterNotes.filter((note) => {
      switch (options.filterDate) {
        case "T":
          return (
            moment(note.id).format("Do MMMM YYYY") ===
            moment(Date.now()).format("Do MMMM YYYY")
          );
        case "TW":
          return (
            moment(note.id).isSameOrAfter(startOfWeek) &&
            moment(note.id).isSameOrBefore(endOfWeek)
          );
        case "LW":
          return moment(note.id).isSameOrBefore(startOfWeek);
        case "TM":
          return (
            moment(note.id).isSameOrAfter(startOfMonth) &&
            moment(note.id).isSameOrBefore(endOfMonth)
          );
        default:
          return true;
      }
    });
    // ----------------SEND NOTES HAVE BEEN FILTER INTO SEARCH
    if (options.keyword === "") {
      return filteredNotes;
    } else {
      let searchNotes = filteredNotes.filter((note) => {
        return Compare(note.title, note.text, options.keyword);
      });
      return searchNotes;
    }
  }
);
