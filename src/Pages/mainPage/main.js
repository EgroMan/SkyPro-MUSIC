import { Player } from"../../components/Audioplayer/AudioPlayer"
import { Sidebar } from "../../components/Sidebar/SideBar.js";
import { Search } from "../../components/Search/Search.js";
import { Nav } from "../../components/Navmenu/NavMenu.js";
import { Filter } from "../../components/Filter/FilterBlock";
import { Content } from "../../components/Content/ContentBlock";
import { Footer } from "../../components/FooterBlock";
import { Tracks } from "../../components/Tracs/tracs";
import * as S from "../../StyleApp";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

export function MainPage({setUser, playerOn, setPlayerOn,user}) {

const [activeTrack, setActiveTrack]=useState([])





    return(
        <S.Wrapper>
      
        <S.Container>
        
          <S.Main>
          
            <Nav setUser={setUser} setPlayerOn={setPlayerOn} />
            <S.MainCenterBlock>
              <Search />
              <Tracks />
              <Filter />
              <Content activeTrack={activeTrack} setActiveTrack={setActiveTrack} playerOn={playerOn} setPlayerOn={setPlayerOn}/>
            </S.MainCenterBlock>
            <Sidebar user={user} />
          </S.Main>
          <Player playerVisibility = {playerOn} activeTrack={activeTrack}  />
          <Footer />
        </S.Container>
      </S.Wrapper>
    )
}