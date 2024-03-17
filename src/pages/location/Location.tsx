import React, { useEffect, useState } from "react";
import { useLocationQuery } from "../../store/features/apiSlice";
import Card from "../../components/location card/LocationCard";
import style from "./Location.module.scss";
import { Pagination } from "../../components/pagination/Pagination";
import { LocationItem } from "../../types/types";

const Location = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const { data, isLoading, refetch } = useLocationQuery(`page=${pageNumber}`);
  const locations = data?.results;
  const lastPage = data?.info.pages;

  const handlePageChange = (pageNumber: number) => {
    setPageNumber(pageNumber);
  };

  useEffect(() => {
    refetch();
  }, [pageNumber]);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul className={style.locationContainer}>
          {locations.map((item: LocationItem, index: number) => (
            <li key={index}>
              <Card item={item} />
            </li>
          ))}
        </ul>
      )}
      {lastPage > 0 && (
        <Pagination
          currentPage={pageNumber}
          totalPages={lastPage}
          onPageChange={handlePageChange}
          setPageNumber={setPageNumber}
        />
      )}
    </div>
  );
};

export default Location;
