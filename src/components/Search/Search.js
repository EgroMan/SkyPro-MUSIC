import sprite from "./sprite.svg";

import "react-loading-skeleton/dist/skeleton.css";
import * as S from "./SearchStyle";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTracksRedux,setSearchResults, setMyTracksRedux, setCategoryResults } from "../../store/reducers/playerSlice";
import { useParams } from "react-router-dom";


export  function Search({tracks,setTracks}) {
const tracksRedux = useSelector(state=>state.track.tracks)
const myTracksRedux = useSelector(state=>state.track.myTracks)
const categoryListRedux = useSelector(state=>state.track.categoryList)
const searchBaseRedux = useSelector(state=>state.track.searchBase)
const [searchText, setSearchText]= useState()
const dispatch=useDispatch()
const param = useParams()
console.log(param)
let page = param.id
console.log(page)
let resultSearch;

function filterAllTracks(){ 
  console.log('Alltracks') 
let inputCase = String(searchText).toLowerCase()
resultSearch = tracksRedux .filter(el=>String(el.name).toLowerCase().includes(inputCase))
setTracks(resultSearch)
}

function filterMyTracks(){ 
  console.log('Mytracks') 
  let inputCase = String(searchText).toLowerCase()
  resultSearch = tracksRedux .filter(el=>String(el.name).toLowerCase().includes(inputCase))
  dispatch(setMyTracksRedux(resultSearch))
  console.log('filter favorites')
  }
  function filterCategoryTracks(){
  console.log('filter category')
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
      console.log(searchText);
       console.log(resultSearch)         
      }} 
      type="search" placeholder="Поиск" name="search" />
    </S.centerblockSearch>
  );
}