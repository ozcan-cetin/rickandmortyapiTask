import React from "react";
import style from "./LocationCard.module.scss";
import { useNavigate } from "react-router-dom";
import { LocationItem } from "../../types/types";

const LocationCard = ({ item }: { item: LocationItem }) => {
  const navigate = useNavigate();
  const { name, dimension, type, residents, id } = item;
  return (
    <div
      className={`${style.card}`}
      onClick={() => navigate(`/location/${id}/characters`)}
    >
      <h3>Name: {name}</h3>
      <p>Type: {type}</p>
      <p>Dimension: {dimension}</p>
      <p>Residents Count: {residents?.length}</p>
    </div>
  );
};

export default LocationCard;
