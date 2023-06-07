import { createSelector } from "reselect";
import { Compare } from "./Compare";
import moment from "moment";

const getNotes = (state) => state.notes.notes;
export const getFilteredItems = createSelector(
  [getNotes, (state, options) => options],
  (notes, options) => {
    return notes.filter((item) => {
      if (options.filterStatus !== undefined && options.filterStatus !== item.status) {
        return false;
      }
      if(options.favorite !== undefined && options.favorite !== item.favorite){
        return false;
      }
      if(options.filterDate.length && !moment(item.id).isBetween(options.filterDate[0],options.filterDate[1])){
        return false;
      }
      if(options.keyword !== '' && !Compare(item.title, item.text, options.keyword)){
        return false;
      }
      return true;
    });
  }
);
