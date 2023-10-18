import sprite from "./sprite.svg";
// import "../components/Search.css";
import "react-loading-skeleton/dist/skeleton.css";
import * as S from "./SearchStyle";
import React, { useState } from "react";

export function Search() {
  // const [contentVisible, setContentVisible] = useState(false);
  // setTimeout(() => {
  //   setContentVisible(true);
  // }, 4000);

  return (
    <S.centerblockSearch className="search">
      <S.searchSvg>
        <use href={`${sprite}#icon-search`} />
      </S.searchSvg>

      <S.searchText type="search" placeholder="Поиск" name="search" />
    </S.centerblockSearch>
  );
}
