import pList01 from "./img/playlist01.png";
import pList02 from "./img/playlist02.png";
import pList03 from "./img/playlist03.png";
import sprite from "./img/icon/sprite.svg";
// import "../components/SideBar.css"
import React, { useContext, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import * as S from "./SideBarStyle.js";
import { UserContext } from "../../App"


export function Sidebar() {

  const user = useContext(UserContext)
  console.log(user)

  const [contentVisible, setContentVisible] = useState(false);
  setTimeout(() => {
    setContentVisible(true);
  }, 4000);

  return (
    <S.sidebarMain className="sidebar">
      
      <S.sidebarPersonal>
        <S.sidebarPersonalName>
          {contentVisible ? (
            
            <span>{user[1]}:<br/>{user[0]}</span>
            
          ) : (
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
              <S.skeletonSideBar />
            </SkeletonTheme>
          )}
        </S.sidebarPersonalName>
        <S.sidebarIcon  >
          <Link onClick={()=>localStorage.removeItem('userName')} to ="/login" >
          <svg  alt="logout">
            <use href={`${sprite}#icon-logout`} />
          </svg>
          </Link>
        </S.sidebarIcon>
      </S.sidebarPersonal>
      <S.sidebarBlock>
        <S.sidebarList>
          <S.sidebarItem>
            <S.sidebarLink to="category/1">
              {contentVisible ? (
                <S.sidebarImg src={pList01} alt="day's playlist" />
              ) : (
                <SkeletonTheme baseColor="#202020" highlightColor="#444">
                  <S.skeletonSideBarImg />
                </SkeletonTheme>
              )}
            </S.sidebarLink>
          </S.sidebarItem>
          <S.sidebarItem>
            <S.sidebarLink to={'/category/2'}>
              {contentVisible ? (
                <S.sidebarImg src={pList02} alt="day's playlist" />
              ) : (
                <SkeletonTheme baseColor="#202020" highlightColor="#444">
                  <S.skeletonSideBarImg />
                </SkeletonTheme>
              )}
            </S.sidebarLink>
          </S.sidebarItem>
          <S.sidebarItem>
            <S.sidebarLink to="category/3">
              {contentVisible ? (
                <S.sidebarImg src={pList03} alt="day's playlist" />
              ) : (
                <SkeletonTheme baseColor="#202020" highlightColor="#444">
                  <S.skeletonSideBarImg />
                </SkeletonTheme>
              )}
            </S.sidebarLink>
          </S.sidebarItem>
        </S.sidebarList>
      </S.sidebarBlock>
    </S.sidebarMain>
  );
}
