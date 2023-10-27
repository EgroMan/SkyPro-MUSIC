import sprite from "./sprite.svg";
import React, { useEffect, useRef, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import "../../img/icon/play.svg";
import * as S from "./PlayerStyles";

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export function Player({ playerVisibility, activeTrack }) {
  const realPlayer = useRef(null);
  const [playerOn, setPlayerOn] = useState(false);
  const [loopOn, setLoopOn] = useState(false);
  const [volumeOn, setVolumeOn] = useState(0.2);
  const [progressOn, setProgressOn] = useState(0);
  const [trackTime, setTrackTime] = useState(0);
  const [timePlay, setTimePlay] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  <span>{formatTime(currentTime)} / {formatTime(trackTime)}</span>

  useEffect(() => {
  if (playerOn) {
    let timeupdateListener = () => {
      setProgressOn(realPlayer.current.currentTime);
    };
    let loadedmetadataListener = () => {
      setTrackTime(realPlayer.current.duration);
    };
    const intervalId = setInterval(() => {
      setCurrentTime(realPlayer.current.currentTime);
    }, 1000);
    realPlayer.current.addEventListener("timeupdate", timeupdateListener);
    realPlayer.current.addEventListener("loadedmetadata", loadedmetadataListener);

    fetch('https://skypro-music-api.skyeng.tech/catalog/track/all/')
      .then(response => response.json())
      .then(data => setTrackTime(data.duration_in_seconds))
      .catch(error => console.log(error));

    return () => {
      clearInterval(intervalId);
    };
  }
}, [playerOn]);

  const clickPlayerStart = () => {
    realPlayer.current.play();
    setPlayerOn(true);
    console.log(realPlayer);
    console.log("click");
  };
  const clickPlayerStop = () => {
    realPlayer.current.pause();
    setPlayerOn(false);
  };
  const clickPlayerLoopOn = () => {
    realPlayer.current.loop = true;
    setLoopOn(true);
  };
  const clickPlayerLoopOff = () => {
    realPlayer.current.loop = false;
    setLoopOn(false);
  };

  const [contentVisible, setContentVisible] = useState(false);
  setTimeout(() => {
    setContentVisible(true);
  }, 500);

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
              {formatTime(currentTime)}{" "}
            </h2>
          </div>
            <S.playerControls>
              <S.playerBtnPrev>
                <S.playerBtnPrevSvg
                  onClick={() => alert("не реализовано")}
                  alt="prev"
                >
                  <use xlinkHref="img/icon/sprite.svg#icon-prev"></use>
                  <use href={`${sprite}#icon-prev`} />
                </S.playerBtnPrevSvg>
              </S.playerBtnPrev>

              <S.playerBtnPlay className="_btn">
                <S.playerBtnPlaySvg
                  onClick={playerOn ? clickPlayerStop : clickPlayerStart}
                  alt="play"
                >
                  {/* <use xlinkHref="img/icon/sprite.svg#icon-play"></use> */}
                  <use
                    href={
                      playerOn ? `${sprite}#icon-pause` : `${sprite}#icon-play`
                    }
                  />
                </S.playerBtnPlaySvg>
              </S.playerBtnPlay>
              <S.playerBtnNext>
                <S.playerBtnNextSvg
                  onClick={() => alert("не реализовано")}
                  alt="next"
                >
                  <use xlinkHref="img/icon/sprite.svg#icon-next"></use>
                  <use href={`${sprite}#icon-next`} />
                </S.playerBtnNextSvg>
              </S.playerBtnNext>
              <S.playerBtnRepeat className="_btn-icon">
                <S.playerBtnRepeatSvg
                  onClick={loopOn ? clickPlayerLoopOff : clickPlayerLoopOn}
                  alt="repeat"
                >
                  {/* <use xlinkHref="img/icon/sprite.svg#icon-repeat"></use> */}
                  <use
                    href={loopOn ? `${sprite}#loopOn` : `${sprite}#icon-repeat`}
                  />
                </S.playerBtnRepeatSvg>
              </S.playerBtnRepeat>
              <S.playerBtnShuffle className=" _btn-icon">
                <S.playerBtnShuffleSvg
                  onClick={() => alert("не реализовано")}
                  alt="shuffle"
                >
                  {/* <use xlinkHref="img/icon/sprite.svg#icon-shuffle"></use> */}
                  <use href={`${sprite}#icon-shuffle`} />
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
                    console.log(volumeOn);
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
