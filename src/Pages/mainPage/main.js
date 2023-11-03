import { Player } from"../../components/Audioplayer/AudioPlayer"
import { Sidebar } from "../../components/Sidebar/SideBar.js";
import { Search } from "../../components/Search/Search.js";
import { Nav } from "../../components/Navmenu/NavMenu.js";
import { Filter } from "../../components/Filter/FilterBlock";
import { Content } from "../../components/Content/ContentBlock";
import { Footer } from "../../components/FooterBlock";
import { Tracks } from "../../components/Tracs/tracs";
import * as S from "../../StyleApp";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export function MainPage({setUser, playerOn, setPlayerOn,user,listName, setListName, tracks, setTracks}) {

const [activeTrack, setActiveTrack]=useState([])
useEffect(() => {
  setListName('Треки')},[])
    return(
        <S.Wrapper>
        <S.Container>
          <S.Main>
            <Nav setUser={setUser} setPlayerOn={setPlayerOn} />
            <S.MainCenterBlock>
              <Search  tracks={tracks} setTracks={setTracks}  />
              <Tracks listName={listName} setListName={setListName} />
              <Filter />
              <Content  tracks={tracks} setTracks={setTracks}  activeTrack={activeTrack} setActiveTrack={setActiveTrack} playerOn={playerOn} setPlayerOn={setPlayerOn}/>
            </S.MainCenterBlock>
            <Sidebar user={user} />
          </S.Main>
          <Footer />
        </S.Container>
      </S.Wrapper>
    )
}