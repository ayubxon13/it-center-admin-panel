"use client";
import {customFetch} from "@/utils/utils";
import {useQuery} from "@tanstack/react-query";

const useGetCategories = () => {
  const {data: groups, isPending: isPendingCategories} = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const categories: {data: ICategory[]} = await customFetch("courses");
      return categories.data;
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  return {groups, isPendingCategories};
};

export default useGetCategories;
