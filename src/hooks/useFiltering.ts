import { useState } from "react";

interface Filter {
    name: string;
    value: string;
    condition: (item: any, value: string) => boolean;
    sort?: (a: any, b: any, order: string) => number; //sorting functionality
    }

const useFiltering = ( filters: Filter[]) => {
  const [filterValues, setFilterValues] = useState(() => {
    const filterInitialValues = filters.map((f) => ({
      name: f.name,
      value: f.value,
    }));
    return filterInitialValues;
  });

  const filteringConditions = filters.map((f) => f.condition);
  const sortingCondition = filters.find(f => f.sort);

  const filterFunction = (collection: any) =>
    filteringConditions.reduce((data, conditionFn, index) => {
      return data.filter((item: any) => {
          return conditionFn(item, filterValues[index].value);
      });
    }, collection);

  const sortFunction = (collection: any) => {
    if (!sortingCondition || !sortingCondition.sort) return collection;
    const order = filterValues.find(f => f.name === "sortOrder")?.value || "asc"; // default to ascending
    return [...collection].sort((a, b) => sortingCondition.sort!(a, b, order));
  }

  return {
    filterValues,
    setFilterValues,
    filterFunction,
    sortFunction,
  };
};

export default useFiltering;