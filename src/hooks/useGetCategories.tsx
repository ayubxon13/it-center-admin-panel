"use client";
import {customFetch} from "@/utils/utils";
import {useQuery} from "@tanstack/react-query";

const useGetCategories = () => {
  const {data: groups, isPending: isPendingCategories} = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const categories: {data: ICategory[]} = await customFetch("category");
      return categories.data;
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  return {groups, isPendingCategories};
};

export default useGetCategories;
