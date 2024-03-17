
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CharacterItem, FavouritesState } from "../../types/types";

const initialState: FavouritesState = {
    favourites: [],
};
if (localStorage.getItem("favourites")) {
    initialState.favourites = [...JSON.parse(localStorage.getItem("favourites")  || "")];
  } else {
    initialState.favourites = [];
  }

const favouriteSlice = createSlice({
    name: "favourites",
    initialState,
    reducers: {
        setFavourites: (state, action: PayloadAction<CharacterItem[]>) => {
            state.favourites = action.payload;
            localStorage.setItem("favourites", JSON.stringify(state.favourites));
        },
    }
});

export const { setFavourites } = favouriteSlice.actions;

export default favouriteSlice.reducer;



