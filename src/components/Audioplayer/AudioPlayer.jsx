import sprite from "./sprite.svg";
import React, { useEffect, useRef, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import "../../img/icon/play.svg";
import * as S from "./PlayerStyles";
import { getMyTracks, getTracks, refreshToken } from "../../api";

import { useNavigate } from "react-router-dom";
import { addMyTracks, delMyTracks } from "../../api";
import { PlayerVolume } from "./Volume";
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
  setCycleRedux,
  setTracksRedux,
  setMyTracksRedux
} from "../../store/reducers/playerSlice";
import { useDispatch } from "react-redux";



export function Player({ playerVisibility, tracks, setTracks, status, setStatus }) {

  const [liked, setLiked] = useState()

  const realPlayer = useRef(null);
  const [playerOn, setPlayerOn] = useState(false);
  const [loopOn, setLoopOn] = useState(false);

  const [progressOn, setProgressOn] = useState(0);
  const [trackTime, setTrackTime] = useState(0);
  const [mix, setMixOn] = useState(false);

  const [allTracks, setAllTracks] = useState([])
  //redux
  const activeTrackRedux = useSelector(state => state.track.activeTrack)
  const myTracks = useSelector(state => state.track.myTracks)
  const filterState = useSelector(state => state.track.filterState)
  const dispatch = useDispatch()
  let activeTrack = activeTrackRedux
  const navigate = useNavigate()
  const filterTracks = useSelector(state => state.track.tracks)
  useEffect(() => {
    renderTracks()
    likes()



    if (!playerOn) {
      setTimeout(() => {
        realPlayer?.current.addEventListener("timeupdate", () => {
          setProgressOn(realPlayer?.current.currentTime);
          dispatch(setProgressRedux(realPlayer?.current.currentTime))
        });
      }, 1);
      setTimeout(() => {
        realPlayer?.current.addEventListener("loadedmetadata", () => {
          setTrackTime(realPlayer?.current.duration);
          dispatch(setTimeRedux(realPlayer?.current.duration))
        });
      }, 1);

      return () => {
        realPlayer?.current.removeEventListener("timeupdate", () => {
          setProgressOn(realPlayer?.current.currentTime);
        });
        realPlayer.current.removeEventListener("loadedmetadata", () => {
          setTrackTime(realPlayer?.current.duration);
        });
      };
    }

  }, [activeTrack, status]);

  function triggerLikes() {
    if (liked === true) { }
    if (liked !== true) { setLiked(true) }
  }
  function triggerDisLikes() {
    if (liked === true) { setLiked(false) }
    if (liked !== true) { }
  }
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
  if (playerOn) {
    realPlayer?.current.play();
  }

  //LIKES-START

  function renderLikes(activeTrack) {
    let item = allTracks.find((item) => item.name === activeTrack.name)
    let id = item.id
    addMyTracks(id).then(() => { renderTracks() }
    ).catch((err) => {

    })
  }
  function renderDisLikes(activeTrack) {

    let item = allTracks.find((item) => item.name === activeTrack.name)
    let id = item.id
    delMyTracks(id).then(() => renderTracks()
    ).catch((err) => {
    })
  }
  function renderTracks() {
    getTracks()
      .then((data) => {
        setAllTracks(data);
        if (!filterState) { setTracks(data); }
        if (!filterState) {
          dispatch(setTracksRedux(data))
        } else {
          dispatch(setTracksRedux(filterTracks))
        }
        setContentVisible(true);
      }).then(() => {
        getMyTracks().then((data) => { dispatch(setMyTracksRedux(data)) })
        .catch((error) => {
          refreshToken().then(() => { getMyTracks().then((data) => { dispatch(setMyTracksRedux(data)) }) })
          setContentVisible(true);

        })
      })
      .catch((error) => {
        alert(error.message)
        setContentVisible(true);
        localStorage.removeItem('userName')
        navigate("/login", { replace: true })

      })
  }

  function likes() {

    let likedTrack = myTracks.find(item => item.name === activeTrack.name)
    setLiked(Boolean(likedTrack))
  }
  //LIKES-END
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
                  onClick={() => { dispatch(setPrevRedux()) }}
                  //PREV
                  alt="prev"
                >
                  <use xlinkHref="img/icon/sprite.svg#icon-prev"></use>
                  <use href={`${sprite}#icon-prev`} />
                </S.playerBtnPrevSvg>
              </S.playerBtnPrev>

              <S.playerBtnPlay className="_btn">
                <S.playerBtnPlaySvg
                  onClick={
                    playerOn ? clickPlayerStop : clickPlayerStart                  //START-STOP
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
                  onClick={() => { dispatch(setNextRedux()) }}                            //NEXT

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
                  // REPEAT
                  />
                </S.playerBtnRepeatSvg>
              </S.playerBtnRepeat>
              <S.playerBtnShuffle className=" _btn-icon">

                <S.playerBtnShuffleSvg
                  onClick={mix ? clickPlayerShuffleOff : clickPlayerShuffleOn}

                  //SHUFFLE
                  alt="shuffle"
                >

                  <use href={mix ? `${sprite}#icon-shuffle-off` : `${sprite}#icon-shuffle`} />
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
                <S.playerTrackPlayLke onClick={() => {
                  renderLikes(activeTrack)


                  triggerLikes()



                }} className=" _btn-icon">
                  <S.playerTrackPlayLikeSvg alt="like">
                    {/* //LIKES */}

                    <use href={

                      liked ? `${sprite}#icon-like-liked` : `${sprite}#icon-like`

                    } />


                  </S.playerTrackPlayLikeSvg>
                </S.playerTrackPlayLke>
                <S.playerTrackPlayDisLke onClick={() => { renderDisLikes(activeTrack); triggerDisLikes() }} className="_btn-icon">
                  <S.playerTrackPlayDisLikeSvg alt="dislike">
                    <use xlinkHref="img/icon/sprite.svg#icon-dislike"></use>
                    <use href={`${sprite}#icon-dislike`} />
                  </S.playerTrackPlayDisLikeSvg>
                </S.playerTrackPlayDisLke>
              </S.playerTrackPlayLkeDislike>
            </S.playerTrackPlay>
          </S.barPlayer_player>

          <PlayerVolume playerOn={playerOn} realPlayer={realPlayer} playerVisibility={playerVisibility} tracks={tracks} setTracks={setTracks} status={status} setStatus={setStatus} />

        </S.playerBlock>
      </S.barContent>
    </S.bar>

  );

}