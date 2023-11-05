
import { UserContext } from "../../App"
import sprite from "./sprite.svg";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React, { useContext, useEffect, useState } from "react";
import * as S from "./favoritesStyle";
import { delMyTracks, getMyTracks, getTracks, refreshToken } from "../../api";
import { Link, useNavigate } from "react-router-dom";
import { Nav } from "../../components/Navmenu/NavMenu";
import { Search } from "../../components/Search/Search";
import { Tracks } from "../../components/Tracs/tracs";
import { Filter } from "../../components/Filter/FilterBlock";
import { Sidebar } from "../../components/Sidebar/SideBar";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setTracksRedux, setTrackRedux, setMyTracksRedux, likeTrackRedux } from "../../store/reducers/playerSlice";


let errorText = null;

export function Favorites({ user, setUser, playerOn, setPlayerOn, listName, setListName,
}) {
    const [contentVisible, setContentVisible] = useState(false);
    const userName = useContext(UserContext)
    const navigate = useNavigate()

    const [tracks, setTracks] = useState([
        { id: "1" },
        { id: "2" },
        { id: "3" },
        { id: "4" },
        { id: "5" },
        { id: "6" },
        { id: "7" }
    ])
    const activeTrackRedux = useSelector(state => state.track.activeTrack)
    const playerOnDot = useSelector(state => state.track.playerOn)
    const myTracks = useSelector(state => state.track.myTracks)
    console.log(myTracks)
    const dispatch = useDispatch();

    async function toggleLike(id) {
        try {
            await delMyTracks(id);
            const updatedTracks = await getMyTracks()
            errorText = null;
            setTracks(updatedTracks);
            setContentVisible(true);
            console.log(tracks)
            dispatch(setMyTracksRedux(updatedTracks))
            return tracks
                ;
        }
        catch (error) {
            errorText = error.message
            setTimeout(() => navigate("/login", { replace: true }), 1000)
            return errorText
        }
    }
    useEffect(() => {
        setListName('Мои треки')
        dispatch(setTracksRedux(tracks))
        console.log('useeff')
        getMyTracks(userName)
            .then((data) => {
                errorText = null;
                console.log(data)
                setContentVisible(true);
                console.log(tracks)
                dispatch(setTracksRedux(data))
                dispatch(setMyTracksRedux(data))
                setTracks(data);
            })
            .catch((error) => {
                errorText = error.message;
                setContentVisible(true);
                setTracks([]);
                refreshToken().then(() => {
                    getMyTracks()
                        .then((data) => {
                            errorText = null;
                            setTracks(data);
                            setContentVisible(true);
                            console.log(tracks)
                            dispatch(setMyTracksRedux(tracks))
                            setTimeout(() => navigate("/favorites", { replace: true }), 2000)
                        })
                })
                return errorText;
            })
    }, []);
    let newTracks;
    { contentVisible ? newTracks = myTracks : newTracks = tracks }

    return (
        <S.Wrapper >
            <S.Container>
                <S.Main>
                    <Nav setUser={setUser} setPlayerOn={setPlayerOn} />
                    <S.MainCenterBlock>
                        <Search />
                        <Tracks listName={listName} setListName={setListName} />
                        <Filter />
                        <S.FavoritesBlockContent>
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
                                            ? `Ошибка: ${errorText}`
                                            : null}
                                    </h1>
                                </div>
                                {
                                    newTracks.map((track, index) => {
                                        return (
                                            <S.Playlist__item key={index} >
                                                <S.Playlist__track
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setPlayerOn('');
                                                        dispatch(setTrackRedux({ track, tracks }))
                                                    }}
                                                >
                                                    <S.Track__title>
                                                        {errorText && <h2>ERROR_{errorText}</h2>}
                                                        <S.Track__titleImage >
                                                            {contentVisible ? (<>
                                                                <S.Playlist__titleSvg_dot_Pause style={track.id === activeTrackRedux.id & playerOnDot === false ? {
                                                                    display: 'block'
                                                                } : { display: 'none' }}></S.Playlist__titleSvg_dot_Pause>
                                                                <S.Playlist__titleSvg_dot style={track.id === activeTrackRedux.id & playerOnDot === true ? { display: 'block' } : { display: 'none' }}></S.Playlist__titleSvg_dot>
                                                                <S.Track__titleSvg style={track.id === activeTrackRedux.id ? {
                                                                    display: 'none'
                                                                } : {}} alt="music">
                                                                    <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
                                                                    <use href={`${sprite}#icon-note`} />
                                                                </S.Track__titleSvg>
                                                            </>
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
                                                            <S.Track__timeSvg
                                                                onClick={() => { toggleLike(track.id_old); console.log(track.id_old) }}
                                                                alt="time">
                                                                <use href={
                                                                    `${sprite}#icon-like-liked`

                                                                } />
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
                        </S.FavoritesBlockContent>
                    </S.MainCenterBlock>
                    <Sidebar user={user} />
                </S.Main>
            </S.Container>
        </S.Wrapper>
    );
}