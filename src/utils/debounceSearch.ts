import _ from "lodash";

export const debounceSearch = _.debounce(
  (
    value: string,
    setParams: React.Dispatch<
      React.SetStateAction<{
        limit: number;
        page: number;
        name?: string;
      }>
    >
  ) => {
    setParams((prevParams) => {
      return { ...prevParams, name: value, page: 1 };
    });
  },
  500
);
