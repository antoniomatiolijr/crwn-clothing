import { createSelector } from "reselect";

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (directory) => directory.collections
);

export const selectCollection = (collectionUrlParam) =>
  createSelector([selectCollections], (collections) => collections[collectionUrlParam]);
