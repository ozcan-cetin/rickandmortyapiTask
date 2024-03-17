import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSingleCharacterQuery, useSingleLocationQuery } from "../../store/features/apiSlice";
import style from "./CharacterDetail.module.scss";
import axios from "axios";
import { Pagination } from "../../components/pagination/Pagination";
import DetailCharacterCard from "../../components/detail card/DetailCharacterCard";
import { CharacterItem } from "../../types/types";

const CharacterDetail = () => {
  const { id, characterId } = useParams();
  const { data, isLoading, isSuccess } = useSingleCharacterQuery(characterId);

  const { data:location, isLoading:locationLoading} = useSingleLocationQuery(id);
  const allCharacters = location && location.residents;
  const [charactersData, setCharactersData] = useState<CharacterItem[]>([]);
  let otherCharacters = charactersData?.filter((item:CharacterItem)=>item.location?.url.split('https://rickandmortyapi.com/api/location/')[1] === id && item.status === data?.status)
  otherCharacters = otherCharacters.filter((item:CharacterItem)=>String(item.id) != characterId)

  const [errorCharacters, setErrorCharacters] = useState<string | null>(null);
  const [isLoadingCharacters, setIsLoadingCharacters] = useState<boolean>(true);

  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(8);
  const totalPages = Math.ceil(otherCharacters?.length / perPage);
  const slicedData = otherCharacters.slice((pageNumber - 1) * perPage, pageNumber * perPage);
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

  
  if (isLoading || isLoadingCharacters) {
    return <div>Loading...</div>;
  }
  if (!isSuccess || errorCharacters) {
    return <div>Error fetching data...</div>;
  }
  return (
    <div>
      <div className={`${style.characterDetail}`}>
        <div>
          <img src={data.image} alt="" />
        </div>
        <div>
          <div>
            <p><span>Name:</span> {data.name}</p>
            <p><span>Status:</span> {data.status}</p>
            <p><span>Species:</span> {data.species}</p>
            <p><span>Type:</span> {data.type ? data.type : "-"}</p>
            <p><span>Gender:</span> {data.gender}</p>
            <p><span>Origin:</span> {data.origin.name}</p>
          </div>
        </div>
      </div>
      <div className={`${style.otherCharacterContainer}`}>
        <h2>OTHER CHARACTERS</h2>
      <div className={`${style.allCharactersContainer}`}>
        {slicedData?.map((item: CharacterItem) => {
          return (
          <DetailCharacterCard item={item}/>
          );
        })}
      </div>
      <Pagination
       currentPage={pageNumber}
       totalPages={totalPages}
       onPageChange={handlePageChange}
       setPageNumber={setPageNumber}/>
      </div>
    </div>
  );
};

export default CharacterDetail;
