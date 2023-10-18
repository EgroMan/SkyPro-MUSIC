import sprite from "./sprite.svg";
// import "../components/ContentBlock.css";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React, { useEffect, useState } from "react";
import * as S from "./ContentStyle.js";
import { getTracks } from "../../api";
import { Link } from "react-router-dom";
//redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setTrackRedux } from "../../store/reducers/playerSlice";

let errorText = null;
let href;
let tracks = [
  { id: "1" },
  { id: "2" },
  { id: "3" },
  { id: "4" },
  { id: "5" },
  { id: "6" },
  { id: "7" },
  { id: "8" },
  { id: "9" },
  { id: "10" },
  { id: "11" },
  { id: "12" },
  { id: "13" },
  { id: "14" },
  { id: "15" },
  { id: "16" },
  { id: "17" },
  { id: "18" },
  { id: "19" },
  { id: "20" },
  { id: "21" },
];
export function Content({ setPlayerOn }) {
  const [contentVisible, setContentVisible] = useState(false);
//redux
  const activeTrackRedux = useSelector(state=>state.track.activeTrack)
 

  console.log(activeTrackRedux)
  const dispatch=useDispatch();
  // console.log(activeTrackRedux[1].currentTrack)

  useEffect(() => {
    getTracks()
      .then((data) => {
        errorText = null;
        tracks = data;
        setContentVisible(true);
        
        return tracks;
      })
      .catch((error) => {
        errorText = error.message;
        setContentVisible(true);
        tracks = [];
        return errorText;
      });
  }, []);

  // const [contentVisible, setContentVisible] = useState(false);
  // setTimeout(() => {
  // setContentVisible(true);
  // }, 1000);

  return (
    <S.CentralBlockContent>
      <S.CentralBlock_playlistTitle>
        <S.PlaylistTitleCol01>Трек</S.PlaylistTitleCol01>
        <S.PlaylistTitleCol02>ИСПОЛНИТЕЛЬ</S.PlaylistTitleCol02>
        <S.PlaylistTitleCol03>АЛЬБОМ</S.PlaylistTitleCol03>
        <S.PlaylistTitleCol04>
          <S.Playlist__titleSvg alt="time">
            <use xlinkHref="img/icon/sprite.svg#icon-watch"></use>
          </S.Playlist__titleSvg>
        </S.PlaylistTitleCol04>
      </S.CentralBlock_playlistTitle>
      <S.CentralBlockContentPlaylist>
        <div style={{ color: "red" }}>
          <h1>
            {errorText !== null
              ? `Ошибка: ${errorText}, попробуйте позже`
              : null}
          </h1>
        </div>

        {tracks.map((track) => {
          return (
            <S.Playlist__item key={track.id}>
              {/* block start */}

              <S.Playlist__track
                onClick={(e) => {
                  e.preventDefault();

                  console.log("player load");
                  setPlayerOn(true);
                  dispatch(setTrackRedux({track,tracks}))
                  

                }}
              >
                <S.Track__title

                // onClick={()=>{
                // console.log('player load');
                // setPlayerOn('');
                // setActiveTrack(track);
                // }}
                >
                  <S.Track__titleImage>
                    {contentVisible ? (
                      <S.Track__titleSvg alt="music">
                        <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
                        <use href={`${sprite}#icon-note`} />
                      </S.Track__titleSvg>
                    ) : (
                      <SkeletonTheme baseColor="#202020" highlightColor="#444">
                        <S.Skeleton_square />
                      </SkeletonTheme>
                    )}
                  </S.Track__titleImage>
                  <S.Track_titleText>
                    <S.Track__titleLink
                      onClick={() => {
                        console.log("player load ?");
                      }}
                      className="trackNameLink"
                      href="http://"
                    >
                      {contentVisible ? (
                        <span>{track.name}</span>
                      ) : (
                        <SkeletonTheme
                          baseColor="#202020"
                          highlightColor="#444"
                        >
                          <S.Skeleton_line />
                        </SkeletonTheme>
                      )}
                      <S.Track__titleSpan></S.Track__titleSpan>
                    </S.Track__titleLink>
                  </S.Track_titleText>
                </S.Track__title>
                <S.Track__author>
                  <S.Track__authorLink href="http://">
                    {contentVisible ? (
                      <span>{track.author}</span>
                    ) : (
                      <SkeletonTheme baseColor="#202020" highlightColor="#444">
                        <S.Skeleton_line />
                      </SkeletonTheme>
                    )}
                  </S.Track__authorLink>
                </S.Track__author>
                <S.Track__album>
                  <S.Track__albumLink href="http://">
                    {contentVisible ? (
                      <span>{track.album}</span>
                    ) : (
                      <SkeletonTheme baseColor="#202020" highlightColor="#444">
                        <S.Skeleton_line />
                      </SkeletonTheme>
                    )}
                  </S.Track__albumLink>
                </S.Track__album>
                <S.Track_time>
                  {contentVisible ? (
                    <S.Track__timeSvg alt="time">
                      <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
                      <use href={`${sprite}#icon-like`} />
                    </S.Track__timeSvg>
                  ) : (
                    <SkeletonTheme baseColor="#202020" highlightColor="#444">
                      <S.Skeleton_lineMini />
                    </SkeletonTheme>
                  )}

                  {contentVisible ? (
                    <S.Track__timeText>
                      {track.duration_in_seconds}
                    </S.Track__timeText>
                  ) : (
                    <SkeletonTheme baseColor="#202020" highlightColor="#444">
                      <S.Skeleton_displayNo />
                    </SkeletonTheme>
                  )}
                </S.Track_time>
              </S.Playlist__track>
            </S.Playlist__item>
          );
        })}
      </S.CentralBlockContentPlaylist>
    </S.CentralBlockContent>
  );
}
