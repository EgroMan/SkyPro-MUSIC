import sprite from "./sprite.svg";
import "react-loading-skeleton/dist/skeleton.css";
import * as S from "./SearchStyle";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {setMyTracksRedux, setCategoryResults } from "../../store/reducers/playerSlice";
import { useParams } from "react-router-dom";


export  function Search({setTracks}) {


const tracksRedux = useSelector(state=>state.track.tracks)
const searchBaseRedux = useSelector(state=>state.track.searchBase)
const [searchText, setSearchText]= useState()
const dispatch=useDispatch()
const param = useParams()

let page = param.id

let resultSearch;
function filterAllTracks(){ 
  
let inputCase = String(searchText).toLowerCase()
resultSearch = tracksRedux .filter(el=>String(el.name).toLowerCase().includes(inputCase))
setTracks(resultSearch)
}

function filterMyTracks(){ 
  let inputCase = String(searchText).toLowerCase()
  resultSearch = tracksRedux .filter(el=>String(el.name).toLowerCase().includes(inputCase))
  dispatch(setMyTracksRedux(resultSearch))
  }
  function filterCategoryTracks(){
    let inputCase = String(searchText).toLowerCase()
    resultSearch = searchBaseRedux.filter(el=>String(el.name).toLowerCase().includes(inputCase))
    dispatch(setCategoryResults(resultSearch))
    }

useEffect(() => {
if (page === '1'||page === '2'||page === '3'){filterCategoryTracks()}
else if (page =='favorites'){filterMyTracks()}
else  {filterAllTracks()};
}, [searchText])


  return (
    <S.centerblockSearch className="search">
      <S.searchSvg>
        <use href={`${sprite}#icon-search`} />
      </S.searchSvg>
      <S.searchText 
      value={searchText}  
      onChange={(event)=>{setSearchText(event.target.value);
      }} 
      
      type="search" placeholder="Поиск" name="search" />
    </S.centerblockSearch>
  );
}