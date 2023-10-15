import { useEffect, useState } from "react";
import DishCard from "./DishCard";
import { useSearchParams } from "next/navigation";
import { MergedData } from "@/types";

const FeedContainer = ({ data, imgData }: { data: any; imgData: any }) => {
  const searchParams = useSearchParams();
  const [numColumns, setNumColumns] = useState(3);
  const [params, setParams] = useState<string | null>(null);
  const [activeSearch, setActiveSearch] = useState<MergedData[]>(data);

  useEffect(() => {
    if (data) {
      setNumColumns((data.length > 5 ? 5 : data.length).toString());
      setParams(searchParams.get("q"));

      if (params !== "" || params !== null) {
        setActiveSearch(
          data
            .filter((dish: MergedData) => dish.name.includes(params as string))
            .slice(0, 8),
        );
      }
    }
  }, [numColumns, data, params, searchParams]);
  return (
    <>
      <div
        className={`grid h-full grid-flow-row grid-cols-${numColumns} w-full gap-2 overflow-y-auto rounded bg-darkSidebarBackground p-5 text-darkMainText`}
      >
        {activeSearch?.length > 0 ? (
          activeSearch.map((dish: MergedData) => (
            <DishCard key={dish.id} dish={dish} imgData={imgData} />
          ))
        ) : (
          <div className="flex items-center justify-center">
            <div className="h-20 w-20 animate-spin rounded-full border-b-8 border-t-8 border-darkPrimary" />
          </div>
        )}
      </div>
    </>
  );
};

export default FeedContainer;
