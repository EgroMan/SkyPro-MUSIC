import sprite from "./sprite.svg";
import React, { useEffect, useRef, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import "../../img/icon/play.svg";
import * as S from "./PlayerStyles";
import { getTracks } from "../../api";

//redux

import { useSelector } from "react-redux";
import { 
  setNextRedux,
  setPrevRedux,
  setTimeRedux,
  setProgressRedux,
  setShuffleRedux,
  setNotShuffleRedux,
  setOnDotRedux,
  setOffDotRedux,
  setCycleRedux} from "../../store/reducers/playerSlice";
import { useDispatch } from "react-redux";


export function Player({playerVisibility}) {

  

  const realPlayer = useRef(null);
  const [playerOn, setPlayerOn] = useState(false);
  const [loopOn, setLoopOn] = useState(false);
  const [volumeOn, setVolumeOn] = useState(0.2);
  const [progressOn, setProgressOn] = useState(0);
  const [trackTime, setTrackTime] = useState(0);
  const [mix, setMixOn] = useState(false);
  

  
 
//redux
const activeTrackRedux = useSelector(state=>state.track.activeTrack)
const dispatch=useDispatch()


let activeTrack = activeTrackRedux


useEffect(() => {
    if(!playerOn){
    setTimeout(() => {
      realPlayer?.current.addEventListener("timeupdate", () => {
        setProgressOn(realPlayer.current.currentTime);
         dispatch(setProgressRedux(realPlayer.current.currentTime))
      });
    }, 1);
    setTimeout(() => {
      realPlayer?.current.addEventListener("loadedmetadata", () => {
        setTrackTime(realPlayer.current.duration);
        
         dispatch(setTimeRedux(realPlayer.current.duration))
      });
    }, 1);

    return () => {
      realPlayer.current.removeEventListener("timeupdate", () => {
        setProgressOn(realPlayer.current.currentTime);
      });
      realPlayer?.current.removeEventListener("loadedmetadata", () => {
        setTrackTime(realPlayer.current.duration);
      });
    };
}
}, []);
  const clickPlayerStart = () => {
    realPlayer?.current.play();
    setPlayerOn(true);
    dispatch(setOnDotRedux())
  };
  const clickPlayerStop = () => {
    realPlayer?.current.pause();
    setPlayerOn(false);
    dispatch(setOffDotRedux())
  };
  const clickPlayerLoopOn = () => {
    realPlayer.current.loop = true;
    setLoopOn(true);
    dispatch(setCycleRedux())
    console.log(activeTrack)

    console.log(activeTrack.id)
    console.log(activeTrack[0])
  };
  const clickPlayerLoopOff = () => {
    realPlayer.current.loop = false;
    setLoopOn(false);
     dispatch(setCycleRedux())
  };

  const clickPlayerShuffleOn = () => {
    dispatch(setShuffleRedux())
   
    setMixOn(true);
  };
  const clickPlayerShuffleOff = () => {
    dispatch(setNotShuffleRedux())
   
    setMixOn(false);
  };


  const [contentVisible, setContentVisible] = useState(false);
  setTimeout(() => {
    setContentVisible(true);
  }, 500);

if(playerOn){
  realPlayer.current.play();
}



  return ( 
    <S.bar style={{ visibility: `${playerVisibility}` }}>
      <S.barContent>
        <audio
          hidden
          id="audio"
          controls
          ref={realPlayer}
          src={activeTrack.track_file}
          style={{ marginBottom: "20px" }}
        >
          AudioPlayer
        </audio>
        <S.progress
          type="range"
          step={0.1}
          min={0}
          onChange={(e) => {
            realPlayer.current.currentTime = e.target.value;
            setProgressOn(e.target.value);
          }}
          value={progressOn}
          max={trackTime}
        ></S.progress>
        <S.playerBlock>
          <S.barPlayer_player>
            <div>
              <h2 style={{ marginLeft: "20px", color: "gray" }}>
                {((trackTime - progressOn) / 60).toFixed(2)}{" "}
              </h2>
            </div>
            <S.playerControls>
              <S.playerBtnPrev>
                <S.playerBtnPrevSvg
                  onClick={()=>{dispatch(setPrevRedux())}}
                  alt="prev"
                >
                  <use xlinkHref="img/icon/sprite.svg#icon-prev"></use>
                  <use href={`${sprite}#icon-prev`} />
                </S.playerBtnPrevSvg>
              </S.playerBtnPrev>

              <S.playerBtnPlay className="_btn">
                <S.playerBtnPlaySvg
                  onClick={
                    playerOn ? clickPlayerStop :  clickPlayerStart          
                  }
                  alt="play"
                >
                  <use
                    href={
                      playerOn ? `${sprite}#icon-pause` : `${sprite}#icon-play`
                    }
                  />
                </S.playerBtnPlaySvg>
              </S.playerBtnPlay>
              <S.playerBtnNext>
                <S.playerBtnNextSvg
                  onClick={ ()=>{dispatch(setNextRedux())}}                            //
                  alt="next">
                  <use xlinkHref="img/icon/sprite.svg#icon-next"></use>
                  <use href={`${sprite}#icon-next`} />
                </S.playerBtnNextSvg>
              </S.playerBtnNext>
              <S.playerBtnRepeat className="_btn-icon">
                <S.playerBtnRepeatSvg
                  onClick={loopOn ? clickPlayerLoopOff : clickPlayerLoopOn}
                  alt="repeat"
                >
                  <use
                    href={loopOn ? `${sprite}#loopOn` : `${sprite}#icon-repeat`}                   
                  />
                </S.playerBtnRepeatSvg>
              </S.playerBtnRepeat>
              <S.playerBtnShuffle  className=" _btn-icon">
                <S.playerBtnShuffleSvg
                  onClick={  mix ? clickPlayerShuffleOff : clickPlayerShuffleOn }
                  alt="shuffle"
                >
                  <use href={mix?`${sprite}#icon-shuffle-off`: `${sprite}#icon-shuffle`} />
                </S.playerBtnShuffleSvg>
              </S.playerBtnShuffle>
            </S.playerControls>

            <S.playerTrackPlay className="track-play">
              <S.playerTrackPlayContain>
                <S.playerTrackPlayImage>
                  {contentVisible ? (
                    <S.playerTrackPlaySvg alt="music">
                      <use href={`${sprite}#icon-note`} />
                    </S.playerTrackPlaySvg>
                  ) : (
                    <SkeletonTheme baseColor="#202020" highlightColor="#444">
                      <S.skeletonImg />
                    </SkeletonTheme>
                  )}
                </S.playerTrackPlayImage>

                <S.playerTrackPlayAuthor>
                  <S.playerTrackPlayAuthorLink href="http://">
                    {contentVisible ? (
                      <span>{activeTrack.name}</span>
                    ) : (
                      <SkeletonTheme baseColor="#202020" highlightColor="#444">
                        <S.skeletonIcon />
                      </SkeletonTheme>
                    )}
                  </S.playerTrackPlayAuthorLink>
                </S.playerTrackPlayAuthor>

                <S.playerTrackPlayAlbum>
                  <S.playerTrackPlayAlbumLink href="http://">
                    {contentVisible ? (
                      <span>{activeTrack.author}</span>
                    ) : (
                      <SkeletonTheme baseColor="#202020" highlightColor="#444">
                        {" "}
                        <S.skeletonIcon />
                      </SkeletonTheme>
                    )}
                  </S.playerTrackPlayAlbumLink>
                </S.playerTrackPlayAlbum>
              </S.playerTrackPlayContain>
              <S.playerTrackPlayLkeDislike>
                <S.playerTrackPlayLke className=" _btn-icon">
                  <S.playerTrackPlayLikeSvg alt="like">
                    <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
                    <use href={`${sprite}#icon-like`} />
                  </S.playerTrackPlayLikeSvg>
                </S.playerTrackPlayLke>
                <S.playerTrackPlayDisLke className="_btn-icon">
                  <S.playerTrackPlayDisLikeSvg alt="dislike">
                    <use xlinkHref="img/icon/sprite.svg#icon-dislike"></use>
                    <use href={`${sprite}#icon-dislike`} />
                  </S.playerTrackPlayDisLikeSvg>
                </S.playerTrackPlayDisLke>
              </S.playerTrackPlayLkeDislike>
            </S.playerTrackPlay>
          </S.barPlayer_player>
          <S.playerBarVolBlock className="volume">
            <S.playerBarVolContent>
              <S.playerBarVolImg>
                <S.playerBarVolSvg alt="volume">
                  <use xlinkHref="img/icon/sprite.svg#icon-volume"></use>
                  <use href={`${sprite}#icon-volume`} />
                </S.playerBarVolSvg>
              </S.playerBarVolImg>
              <S.playerBarVolProgress className="_btn">
                <S.playerBarVolProgressLine
                  onChange={(e) => {
                    let volumeRange = e.target.value / 100;
                    realPlayer.current.volume = volumeRange;
                    setVolumeOn(volumeRange);
                    
                  }}
                  className="_btn"
                  type="range"
                  name="range"
                />
              </S.playerBarVolProgress>
            </S.playerBarVolContent>
          </S.playerBarVolBlock>
        </S.playerBlock>
      </S.barContent>
    </S.bar>
    
  );
  
}