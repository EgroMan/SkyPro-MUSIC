import React, { useState } from "react";
import logo from "./logo.png";
import * as S from "./NavStyle.js";
import { Link } from "react-router-dom";

export function Nav({setUser, setPlayerOn}) {
  const [menuVisible, setVisible] = useState(false);
  const menuClick = () => {
    setVisible(!menuVisible);
  };

  return (
    <S.MainNav>
      <S.NavLogo>
        <S.LogoImg src={logo} alt="logo" />
      </S.NavLogo>
      <S.NavBurger onClick={menuClick}>
        <S.BurgerLine></S.BurgerLine>
        <S.BurgerLine></S.BurgerLine>
        <S.BurgerLine></S.BurgerLine>
      </S.NavBurger>

      {menuVisible ? (
        <S.NavMenu>
          <S.MenuList>
            <S.MenuItem>
            <S.MenuLink to ="/">Главное</S.MenuLink>
            </S.MenuItem>
            <S.MenuItem>
              <S.MenuLink to ="/favorites">Мой плейлист</S.MenuLink>
            </S.MenuItem>
            <S.MenuItem>
              <S.MenuLink onClick={()=>localStorage.removeItem('userName')} to ="/login">{setUser?'ВЫЙТИ':'Войти'}</S.MenuLink>
            </S.MenuItem>
          </S.MenuList>
        </S.NavMenu>
      ) : null}
    </S.MainNav>
  );
}