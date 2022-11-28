import React from "react";
import FavouriteCard from "./FavouriteCard";
import listStyles from "./styles/favList.module.css";
import noContentStyles from "../docsComponent/styles/noContentMessage.module.css";

const FavCardList = ({ favoritesCardsArray }) => {
  return (
    <div className={listStyles.favList}>
      {favoritesCardsArray.length < 1 ? (
        <div className={noContentStyles.messageContainer}>
          <p>No Favourite Cards</p>
        </div>
      ) : null}

      {favoritesCardsArray.map((favItem) => (
        <FavouriteCard favItem={favItem} />
      ))}
    </div>
  );
};

export default FavCardList;
