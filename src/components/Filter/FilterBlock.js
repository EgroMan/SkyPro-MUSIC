import { useState } from "react";
// import "../Filter/FilterBlock.css"
import React from "react";
import * as S from "./FilterStyles.js";

export function Filter() {
  const [activeFilter, setActiveFilter] = useState("");
  return (
    <S.centralBlockFilter className="filter">
      <S.centralBlockFilterTitle>Искать по:</S.centralBlockFilterTitle>

      <S.filterBlockPerformer>
        <div className="filter_performer">
          <S.centralBlockFilterButton
            onClick={() => {
              activeFilter === "author"
                ? setActiveFilter("")
                : setActiveFilter("author");
              console.log(`click`);
            }}
            className="_btn-text"
          >
            Исполнителю
          </S.centralBlockFilterButton>
        </div>
        <div>
          {activeFilter === "author" ? (
            <S.displayYes>
              <li>
                <S.filterBlockLink href="#">исполнитель1</S.filterBlockLink>
              </li>
              <li>
                <S.filterBlockLink href="#">
                  исполнитель2исполнитель2
                </S.filterBlockLink>
              </li>
              <li>
                <S.filterBlockLink href="#">исполнитель3</S.filterBlockLink>
              </li>
              <li>
                <S.filterBlockLink href="#">исполнитель4</S.filterBlockLink>
              </li>
              <li>
                <S.filterBlockLink href="#">исполнитель5</S.filterBlockLink>
              </li>
              <li>
                <S.filterBlockLink href="#">исполнитель6</S.filterBlockLink>
              </li>
              <li>
                <S.filterBlockLink href="#">исполнитель7</S.filterBlockLink>
              </li>
              <li>
                <S.filterBlockLink href="#">исполнитель5</S.filterBlockLink>
              </li>
              <li>
                <S.filterBlockLink href="#">исполнитель6</S.filterBlockLink>
              </li>
              <li>
                <S.filterBlockLink href="#">исполнитель7</S.filterBlockLink>
              </li>
            </S.displayYes>
          ) : null}
        </div>
      </S.filterBlockPerformer>

      <S.filterBlockYear>
        <div className="filter_performer">
          <S.centralBlockFilterButton
            onClick={() => {
              activeFilter === "year"
                ? setActiveFilter("")
                : setActiveFilter("year");
              console.log(`click-y`);
            }}
            className="_btn-text"
          >
            году выпуска
          </S.centralBlockFilterButton>
        </div>
        <div>
          {activeFilter === "year" ? (
            <S.displayYes>
              <li>
                <S.filterBlockLink href="#">Год Выпуска1</S.filterBlockLink>
              </li>
              <li>
                <S.filterBlockLink href="#">Год Выпуска2</S.filterBlockLink>
              </li>
              <li>
                <S.filterBlockLink href="#">Год Выпуска3</S.filterBlockLink>
              </li>
              <li>
                <S.filterBlockLink href="#">Год Выпуска4</S.filterBlockLink>
              </li>
              <li>
                <S.filterBlockLink href="#">Год Выпуска5</S.filterBlockLink>
              </li>
            </S.displayYes>
          ) : null}
        </div>
      </S.filterBlockYear>
      <S.filterBlockStyle>
        <div className="filter_style">
          <S.centralBlockFilterButton
            onClick={() => {
              activeFilter === "style"
                ? setActiveFilter("")
                : setActiveFilter("style");
              console.log(`click`);
            }}
            className="_btn-text"
          >
            жанру
          </S.centralBlockFilterButton>
        </div>

        {/* <div className="filter_style">
    <S.centralBlockFilterButton onClick={()=>{activeFilter==='style'?setActiveFilter('') :setActiveFilter('style')
console.log(`click`)}} className="_btn-text">жанру</S.centralBlockFilterButton>
  </div>  */}

        <div>
          <S.styleFilterUl isactive ={ activeFilter === "style"? "style": null }>
            <li>
              <S.filterBlockLink href="#">Жанр муз1</S.filterBlockLink>
            </li>
            <li>
              <S.filterBlockLink href="#">Жанр муз2</S.filterBlockLink>
            </li>
            <li>
              <S.filterBlockLink href="#">Жанр муз3</S.filterBlockLink>
            </li>
            <li>
              <S.filterBlockLink href="#">Жанр муз4</S.filterBlockLink>
            </li>
          </S.styleFilterUl>

          {/* <ul className={activeFilter === 'style' ? 'display_yes':'display_no'} >
    <li><a className="link"href="#">Жанр муз1</a></li>
    <li><a className="link"href="#">Жанр муз2</a></li>
    <li><a className="link"href="#">Жанр муз3</a></li>
    <li><a className="link"href="#">Жанр муз4</a></li>
    </ul> */}
        </div>
      </S.filterBlockStyle>
    </S.centralBlockFilter>
  );
}
