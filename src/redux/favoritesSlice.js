import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteRecipes: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const recipe = action.payload;
      const existingIndex = state.favoriteRecipes.findIndex(
        (item) => item.idFood === recipe.idFood
      );
      if (existingIndex >= 0) {
        state.favoriteRecipes.splice(existingIndex, 1);
      } else {
        state.favoriteRecipes.push(recipe);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;