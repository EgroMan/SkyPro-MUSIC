import sprite from "./sprite.svg";
import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import "../../img/icon/play.svg";
import * as S from "./PlayerStyles";

export function PlayerVolume({ realPlayer}) {

  return (  <S.playerBarVolBlock className="volume">
            <S.playerBarVolContent>
            <S.playerBarVolImg>
                <S.playerBarVolSvg alt="volume">
                  <use xlinkHref="img/icon/sprite.svg#icon-volume"></use>
                  <use href={`${sprite}#icon-volume`} />
                </S.playerBarVolSvg>
              </S.playerBarVolImg>
              <S.playerBarVolProgress className="_btn">
              <S.playerBarVolProgressLine
                  onChange={(e) => {let volumeRange = e.target.value / 100;realPlayer.current.volume = volumeRange;}}
                  className="_btn"
                  type="range"
                  name="range"
                />
              </S.playerBarVolProgress>
            </S.playerBarVolContent>
          </S.playerBarVolBlock>


  )
  
}
