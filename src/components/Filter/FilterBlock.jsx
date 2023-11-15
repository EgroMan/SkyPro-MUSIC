import { useEffect, useState } from "react";
import React from "react";
import * as S from "./FilterStyles.jsx";
import {
  setTracksRedux, setMyTracksRedux, setCategoryResults, setSortYearFavoritesGr,
  setSortYearFavoritesDcr, setSortYearMyTracksGr, setSortYearMyTracksDcr, setFilterState
} from "../../store/reducers/playerSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getMyTracks, getTracks, refreshToken } from "../../api";
import { useParams } from "react-router-dom";

export function Filter({ setTracks }) {

  const [filterAuthorNumber, setFilterAuthorNumber] = useState('')
  const [filterSortNumber, setFilterSortNumber] = useState('')
  const [filterCategoryNumber, setFilterCategoryNumber] = useState('')
  const [filterType, setFilterType] = useState()
  const searchBaseRedux = useSelector(state => state.track.searchBase)

  const categoryListRedux = useSelector(state => state.track.categoryList)
  const [genre, setGenre] = useState([])
  const [filterTracks, setFilterTracks] = useState([])
  const [filterMyTracks, setFilterMyTracks] = useState([])
  const [unFilterTracks, setUnFilterTracks] = useState([])
  const [filterOnAuthor, setFilterOnAuthor] = useState([])
  const [filterOnYear, setFilterOnYear] = useState([])
  const [filterOnGenre, setFilterOnGenre] = useState([])

  const param = useParams()
  let page = param.id


  useEffect(() => {
    getTracks().then((data) => {
      let newNewArr = []
      for (let index = 0; index < data.length; index++) {
        newNewArr.push(data[index].author)
      }
      let newNewNewArr = [...new Set(newNewArr)]
      setUnFilterTracks(newNewNewArr)
      setFilterTracks(data)
    })
    getMyTracks().then((data) => { setFilterMyTracks(data) })
      .catch((error) => { refreshToken().then(() => { getMyTracks().then((data) => { setFilterMyTracks(data) }) }) })
  }, [])

  //filter AUTHOR 

  function callFilterFunction(track) {
    dispatch(setFilterState());
    if (page === '1' || page === '2' || page === '3') { authorFilterCategory(track) }
    else if (page === 'favorites') { authorFilterMy(track) }
    else { authorFilterAll(track) };
  }

  function authorFilterAll(track) {
    setTracks(filterTracks.filter((el) => el.author === track
    ));
    setFilterAuthorNumber(filterTracks.filter((el) => el.author === track
    ).length);
    dispatch(setTracksRedux(filterTracks.filter((el) => el.author === track
    )))
  };


  function authorFilterMy(track) {
    let resultSearchAll = filterMyTracks.filter((el) => el.author === track
    )
    setFilterAuthorNumber(filterMyTracks.filter((el) => el.author === track
    ).length)
    dispatch(setMyTracksRedux(resultSearchAll))
  };
  function authorFilterCategory(track) {
    let resultSearch = searchBaseRedux.filter((el) => el.author === track
    )
    setFilterAuthorNumber(searchBaseRedux.filter((el) => el.author === track
    ).length)
    dispatch(setCategoryResults(resultSearch))
  };

  //sort YEAR DATA

  //grow
  function sortYearGrow() {
    if (page === '1' || page === '2' || page === '3') { sortYearGrowCategory() }
    else if (page === 'favorites') { sortYearGrowMy() }
    else { sortYearGrowAll() };

  }


  function sortYearGrowAll() {
    setFilterSortNumber(filterTracks.length)
    let newArr = [...filterTracks]
    newArr.sort(function grow(a, b) {
      return new Date(a.release_date) - new Date(b.release_date)
    })
    setTracks(newArr);
  }

  function sortYearGrowMy() {
    setFilterSortNumber(filterMyTracks.length)
    dispatch(setSortYearMyTracksGr(filterMyTracks))

  }

  function sortYearGrowCategory() {
    setFilterSortNumber(categoryListRedux.length)
    dispatch(setSortYearFavoritesGr(categoryListRedux))
  }

  //decrease
  function sortYearDecrease() {
    if (page === '1' || page === '2' || page === '3') { sortYearDecreaseCategory() }
    else if (page === 'favorites') { sortYearDecreaseMy() }
    else { sortYearDecreaseAll() };
  }

  function sortYearDecreaseAll() {
    setFilterSortNumber(filterTracks.length)
    let newArr = [...filterTracks]
    newArr.sort(function grow(a, b) {
      return new Date(b.release_date) - new Date(a.release_date)
    })
    setTracks(newArr)
  }

  function sortYearDecreaseMy() {

    setFilterSortNumber(filterMyTracks.length)
    dispatch(setSortYearMyTracksDcr(filterMyTracks))

  }

  function sortYearDecreaseCategory() {
    setFilterSortNumber(categoryListRedux.length)
    dispatch(setSortYearFavoritesDcr(categoryListRedux))
  }
  //category Fiter

  function genreChoose() {

    if (page === '1' || page === '2' || page === '3') { categoryTracksGenreFilter() }
    else if (page == 'favorites') { myTracksGenreFilter() }
    else { allTracksGenreFilter() };

  }

  function allTracksGenreFilter() {
    if (genre === 0) {
      setTracks(filterTracks.filter((el) => el.genre === 'Классическая музыка'))
      setFilterCategoryNumber(filterTracks.filter((el) => el.genre === 'Классическая музыка').length)
    }
    else if (genre === 1) {
      setTracks(filterTracks.filter((el) => el.genre === 'Электронная музыка'))
      setFilterCategoryNumber(filterTracks.filter((el) => el.genre === 'Электронная музыка').length)
    }
    else {
      setTracks(filterTracks.filter((el) => el.genre === 'Рок музыка'))
      setFilterCategoryNumber(filterTracks.filter((el) => el.genre === 'Рок музыка').length)
    }
  }

  function myTracksGenreFilter() {


    if (genre === 0) {
      let resultSearchAll = filterMyTracks.filter((el) => el.genre === 'Классическая музыка')
      setFilterCategoryNumber(filterMyTracks.filter((el) => el.genre === 'Классическая музыка').length)
      dispatch(setMyTracksRedux(resultSearchAll))
    }
    else if (genre === 1) {
      let resultSearchAll = filterMyTracks.filter((el) => el.genre === 'Электронная музыка')
      setFilterCategoryNumber(filterMyTracks.filter((el) => el.genre === 'Электронная музыка').length)
      dispatch(setMyTracksRedux(resultSearchAll))
    }
    else {
      let resultSearchAll = filterMyTracks.filter((el) => el.genre === 'Рок музыка')
      setFilterCategoryNumber(filterMyTracks.filter((el) => el.genre === 'Рок музыка').length)
      dispatch(setMyTracksRedux(resultSearchAll))
    }
  }


  function categoryTracksGenreFilter() {
    if (genre === 0) {
      let resultSearch = searchBaseRedux.filter((el) => el.genre === 'Классическая музыка')
      setFilterCategoryNumber(searchBaseRedux.filter((el) => el.genre === 'Классическая музыка').length)
      dispatch(setCategoryResults(resultSearch))
    }
    else if (genre === 1) {
      let resultSearch = searchBaseRedux.filter((el) => el.genre === 'Электронная музыка')
      setFilterCategoryNumber(searchBaseRedux.filter((el) => el.genre === 'Электронная музыка').length)
      dispatch(setCategoryResults(resultSearch))
    }
    else {
      let resultSearch = searchBaseRedux.filter((el) => el.genre === 'Рок музыка')
      setFilterCategoryNumber(searchBaseRedux.filter((el) => el.genre === 'Рок музыка').length)
      dispatch(setCategoryResults(resultSearch))
    }
  }

  const dispatch = useDispatch();
  const [activeFilter, setActiveFilter] = useState("");

  return (
    <S.centralBlockFilter className="filter">
      <S.centralBlockFilterTitle>Искать по:</S.centralBlockFilterTitle>
      <S.filterBlockPerformer>
        <div style={{ display: 'flex', flexDirection: 'row-reverse', }} className="filter_performer">
          <div
            style={filterType === "author" & filterAuthorNumber != 0 ? { display: 'block', position: 'absolute', top: '-10px', right: '-10px' } : { display: 'none' }}
          >
            <S.styleFilterH2Dot>{filterAuthorNumber}</S.styleFilterH2Dot>
          </div>
          <S.centralBlockFilterButton
            stylepropsauthor={filterOnAuthor}
            onClick={() => {
              setFilterOnAuthor('author')
              setFilterOnYear('')
              setFilterOnGenre('')
              activeFilter === "author"
                ? setActiveFilter("")
                : setActiveFilter("author"); setFilterType("author")
            }}
            className="_btn-text"
          >
            Исполнителю
          </S.centralBlockFilterButton>
        </div>
        <div>
          {activeFilter === "author" ? (
            <S.displayYes>
              <S.displayYesScroll>
                {
                  unFilterTracks
                    .map((track, index) => {
                      return (
                        <li >
                          <S.filterBlockLink key={index} onClick={
                            () => {
                              ; callFilterFunction(track)
                            }
                          } href="#">{
                              track
                            }</S.filterBlockLink>
                        </li>
                      );
                    })}
              </S.displayYesScroll>
            </S.displayYes>
          ) : null}
        </div>
      </S.filterBlockPerformer>
      <S.filterBlockYear>
        <S.styleDotDiv filterType={filterType}
          style={filterType === "year" & filterSortNumber != 0 ? {
            display: 'block',
            position: 'absolute',
            top: '-10px',
            right: '-10px'
          }
            : { display: 'none' }}
        >
          <S.styleFilterH2Dot>{filterSortNumber}</S.styleFilterH2Dot>
        </S.styleDotDiv>
        <div className="filter_performer">
          <S.centralBlockFilterButtonYear
            stylepropsyear={filterOnYear}
            onClick={() => {
              setFilterOnYear('year')
              setFilterOnAuthor('')
              setFilterOnGenre('')
              activeFilter === "year"
                ? setActiveFilter("")
                : setActiveFilter("year"); setFilterType("year")
            }}
            className="_btn-text"
          >
            году выпуска
          </S.centralBlockFilterButtonYear>
        </div>
        <div>
          {activeFilter === "year" ? (
            <S.displayYesYar>
              <li style={{ display: 'flex', columnGap: '24px' }} >
                <S.filterBlockLink key={'year1'} onClick={() => { sortYearGrow() }} href="#">Сначала новые</S.filterBlockLink>
              </li>
              <li >
                <S.filterBlockLink key={'year2'} onClick={() => { sortYearDecrease() }} href="#">Сначала старые</S.filterBlockLink>
              </li>
            </S.displayYesYar>
          ) : null}
        </div>
      </S.filterBlockYear>
      <S.filterBlockStyle>
        <div
          style={filterType === "style" & filterCategoryNumber != 0 ? { display: 'block', position: 'absolute', top: '-10px', right: '-10px' } : { display: 'none' }}
        >
          <S.styleFilterH2Dot>{filterCategoryNumber}</S.styleFilterH2Dot>
        </div>
        <div className="filter_style">
          <S.centralBlockFilterButtonGenre
            stylepropsgenre={filterOnGenre}
            onClick={() => {
              setFilterOnGenre('genre')
              setFilterOnAuthor('')
              setFilterOnYear('')
              activeFilter === "style"
                ? setActiveFilter("")
                : setActiveFilter("style"); setFilterType("style")
            }}
            className="_btn-text"
          >
            жанру
          </S.centralBlockFilterButtonGenre>
        </div>
        <div>
          <S.styleFilterUl isactive={activeFilter === "style" ? "style" : null}>
            <li style={{ marginBottom: '25px' }} key={'cl'}>
              <S.filterBlockLink onClick={() => { setGenre(0); genreChoose() }} href="#">Классика</S.filterBlockLink>
            </li>
            <li style={{ marginBottom: '25px' }} key={'in'}>
              <S.filterBlockLink onClick={() => { setGenre(1); genreChoose() }} href="#">Инди</S.filterBlockLink>
            </li>
            <li style={{ marginBottom: '25px' }} key={'rk'}>
              <S.filterBlockLink onClick={() => { setGenre(2); genreChoose() }} href="#">Рок</S.filterBlockLink>
            </li>
            <li style={{ marginBottom: '25px' }} key={'{hp2}'}>
              <S.filterBlockLink onClick={() => { setGenre(1); genreChoose() }} href="#">Хипхоп</S.filterBlockLink>
            </li>
          </S.styleFilterUl>
        </div>
      </S.filterBlockStyle>
    </S.centralBlockFilter>
  );
}