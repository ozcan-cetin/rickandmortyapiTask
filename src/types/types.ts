export interface LocationType {
  name: string;
  url: string;
}
export interface CharacterItem {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  location: LocationType;
  type:string;
  origin:LocationType;
  episodes:string[]
  url:string;
  created:string;
}
export interface LocationItem {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
}
export interface LinkItem {
  url: string;
  title: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  setPageNumber: (pageNumber: number) => void;
}

export interface FavouritesState {
  favourites: CharacterItem[];
}
