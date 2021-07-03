import { Tracks_tracks_checkList as CheckList } from "../../../../../../graphql/query/tracks/__generated__/Tracks";

export const isCheckListComplete = (checkList: CheckList[]) => {
  if (checkList.length < 1) {
    return true;
  }
  return checkList.every((task) => {
    return task.isComplete === true;
  });
};
