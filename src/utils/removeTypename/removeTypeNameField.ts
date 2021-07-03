interface Obj {
  __typename: string;
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const removeTypeNameField = <T extends Obj>(arr: T[]) => {
  const newArr: Omit<T, "__typename">[] = [];

  arr.forEach((item) => {
    let newItem: any = {};
    for (const key in item) {
      if (Object.prototype.hasOwnProperty.call(item, key)) {
        if (key !== "__typename") {
          newItem[key] = item[key];
        }
      }
    }
    newArr.push(newItem);
  });
  return newArr;
};
