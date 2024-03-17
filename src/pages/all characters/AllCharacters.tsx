import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSingleLocationQuery } from "../../store/features/apiSlice";
import axios from "axios";
import style from "./AllCharacters.module.scss";
import { IoIosArrowDown } from "react-icons/io";
import { Pagination } from "../../components/pagination/Pagination";
import CharacterCard from "../../components/character card/CharacterCard";
import { CharacterItem } from "../../types/types";

const AllCharacters = () => {
  const { id } = useParams();
  const { data, isLoading, isSuccess } = useSingleLocationQuery(id);
  const allCharacters = data && data.residents;

  const [charactersData, setCharactersData] = useState<CharacterItem[]>([]);
  const [isLoadingCharacters, setIsLoadingCharacters] = useState<boolean>(true);
  const [errorCharacters, setErrorCharacters] = useState<string | null>(null);
  const [filteredCharactersData, setFilteredCharactersData] = useState<
    CharacterItem[]
  >([]);
  const [selectedStatus, setSelectedStatus] = useState("");

//pagination section
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(8);
  const totalPages = Math.ceil(filteredCharactersData?.length / perPage);
  const slicedData = filteredCharactersData.slice((pageNumber - 1) * perPage, pageNumber * perPage);
  const handlePageChange = (pageNumber:number) => {
    setPageNumber(pageNumber);
  };

  useEffect(() => {
    const fetchDataForUrls = async () => {
      try {
        if (allCharacters) {
          const responses = await Promise.all(
            allCharacters.map((url: string) => axios.get<CharacterItem>(url))
          );
          const charactersData = responses.map((response) => response.data);
          setCharactersData(charactersData);
          setIsLoadingCharacters(false);
          setErrorCharacters(null);
        }
      } catch (error) {
        setErrorCharacters("Error fetching data for characters");
        setIsLoadingCharacters(false);
      }
    };

    fetchDataForUrls();
  }, [allCharacters]);

  const handleStatus = (status: string) => {
    setSelectedStatus(status);
    if (status === "All") {
      setFilteredCharactersData(charactersData);
    } else {
      setFilteredCharactersData(
        charactersData.filter(
          (item) => item.status.toLowerCase() === status.toLowerCase()
        )
      );
    }
  };

  useEffect(() => {
    if (charactersData) {
      setFilteredCharactersData(charactersData);
    }
  }, [charactersData]);

  if (isLoading || isLoadingCharacters) {
    return <div>Loading...</div>;
  }

  if (!isSuccess || errorCharacters) {
    return <div>Error fetching data...</div>;
  }
  return (
    <div>
      <div className={`${style.selectDiv}`}>
        <select
          name="status"
          id="status"
          value={selectedStatus}
          onChange={(e) => handleStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Dead">Dead</option>
          <option value="Alive">Alive</option>
          <option value="Unknown">Unknown</option>
        </select>
        <IoIosArrowDown className={`${style.arrow}`} />
      </div>
      <div className={`${style.allCharactersContainer}`}>
        {slicedData?.map((item: CharacterItem) => {
          return (
            <CharacterCard item={item} charactersData={charactersData} key={item.id}/>
          );
        })}
      </div>
        <Pagination
       currentPage={pageNumber}
       totalPages={totalPages}
       onPageChange={handlePageChange}
       setPageNumber={setPageNumber}/>
    </div>
  );
};

export default AllCharacters;
