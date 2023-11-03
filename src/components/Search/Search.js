import sprite from "./sprite.svg";

import "react-loading-skeleton/dist/skeleton.css";
import * as S from "./SearchStyle";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTracksRedux, setSearchResults, setMyTracksRedux } from "../../store/reducers/playerSlice";
import { useParams } from "react-router-dom";


export function Search({ tracks, setTracks }) {
  const tracksRedux = useSelector(state => state.track.tracks)
  const myTracksRedux = useSelector(state => state.track.myTracks)
  const [searchText, setSearchText] = useState()
  const dispatch = useDispatch()
  const param = useParams()
  console.log(param)
  let page = param.id
  console.log(page)
  let resultSearch;


  function filterAllTracks() {
    let inputCase = String(searchText).toLowerCase()
    console.log(inputCase)
    console.log(tracksRedux)
    resultSearch = tracksRedux.filter(el => String(el.name).toLowerCase().includes(inputCase))
    console.log(tracksRedux)
    console.log(searchText)
    console.log(resultSearch)
    setTracks(resultSearch)
  }

  function filterMyTracks() {

    let inputCase = String(searchText).toLowerCase()
    console.log(inputCase)
    console.log(myTracksRedux)
    resultSearch = tracksRedux.filter(el => String(el.name).toLowerCase().includes(inputCase))
    // console.log(tracksRedux)
    console.log(searchText)
    console.log(resultSearch)
    // setTracks(resultSearch)
    dispatch(setMyTracksRedux(resultSearch))
  }
  return (
    <S.centerblockSearch className="search">
      <S.searchSvg>
        <use href={`${sprite}#icon-search`} />
      </S.searchSvg>

      <S.searchText onChange={(event) => {
        setSearchText(event.target.value); console.log(searchText);
        { page === 'favorites' ? filterMyTracks() : filterAllTracks() };
        console.log(resultSearch)
      }} type="search" placeholder="Поиск" name="search" />
    </S.centerblockSearch>
  );
}


// resultSearch = tracks.filter(el=>String(el.name).toLowerCase().includes(inputCase))