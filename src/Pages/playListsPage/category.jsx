import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getSelectionTracks } from "../../api";
import * as S from "./categoryStyle"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setTrackRedux, getAllTracksRedux, likeTrackRedux, setLikedStatusRedux } from "../../store/reducers/playerSlice";
import { useNavigate } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import { addMyTracks, delMyTracks, getTracks } from "../../api";
import sprite from "./sprite.svg";
import { UserContext } from "../../App"
import { Nav } from "../../components/Navmenu/NavMenu";
import { Search } from "../../components/Search/Search";
import { Tracks } from "../../components/Tracs/tracs";
import { Filter } from "../../components/Filter/FilterBlock";
import { Sidebar } from "../../components/Sidebar/SideBar";



let errorText = null;

const arr = [
    {
        id: 1,
        listName: `Лист дня`
    },
    {
        id: 2,
        listName: `100 лучших песен`
    },
    {
        id: 3,
        listName: `Инди`
    },
]

export function PlayListPage({ user, setUser, playerOn, setPlayerOn, listName, setListName }) {



    const navigate = useNavigate()
    const [tracks, setTracks] = useState([])
    const [error, setError] = useState(null)
    const [contentVisible, setContentVisible] = useState(false);
    const dispatch = useDispatch();
    const activeTrackRedux = useSelector(state => state.track.activeTrack)
    const playerOnDot = useSelector(state => state.track.playerOn)
    const userName = useContext(UserContext)
    const [category, setCategory] = useState([])

    const param = useParams()

    function setGenreList(genre) {
        if (genre === 0)
            setListName('Классическая музыка')
        if (genre === 1)
            setListName('Инди музыка')
        if (genre === 2)
            setListName('Рок музыка')
        getSelectionTracks().then((data) => {
            let selectionTracks = data
            let tracks = selectionTracks[genre].items
            return tracks
        }).then((data) => {
            errorText = null;
            setTracks(data);
            setContentVisible(true);
            return tracks;
        })
            .catch((error) => {
                errorText = error.message;
                setContentVisible(true);
                setTracks([]);
                localStorage.removeItem('userName')
                return errorText;
            })
    }


    useEffect(() => {
        setGenreList(Number(param.id) - 1)
    }, [param])
    let list = arr.find((el) => el.id === Number(param.id))
    console.log(list)



    function renderLikes(id) {
        addMyTracks(id).then(() => renderTracks()
        ).catch((err) => {
            // localStorage.removeItem('userName');
            setError(err.message);
            setTimeout(() => navigate("/login", { replace: true }), 2000)
        })
    }
    function renderDisLikes(id) {
        delMyTracks(id).then(() => renderTracks()
        ).catch((err) => {
            setError(err.message);
        })
    }

    function renderTracks() {
        setGenreList(Number(param.id) - 1)

    }
    function likes(track) {
        for (let index_user = 0; index_user < track.stared_user.length; index_user++) {
            let likName = track.stared_user[index_user].username

            let un = userName

            if (likName === un[0]) { return track.id }
        }
    }
    return (<S.Wrapper >

        <S.Container>
            <S.Main>
                <Nav setUser={setUser} setPlayerOn={setPlayerOn} />
                <S.MainCenterBlock>
                    <Search />
                    <Tracks listName={listName} setListName={setListName} />
                    <Filter />

                    <S.CentralBlockContent>
                        {error && <h2 style={{
                            color: 'red',
                            alignSelf: 'center'
                        }}>{error} для простановки лайков</h2>}
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
                                    <S.Playlist__item key={track.id} >
                                        <S.Playlist__track
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setPlayerOn('');
                                                dispatch(setTrackRedux({ track, tracks }))
                                            }}
                                        >
                                            <S.Track__title>
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
                                                    <S.Track__timeSvg onClick={() => {
                                                        likes(track) !== track.id ? renderLikes(track.id) : renderDisLikes(track.id)
                                                        console.log('ADD CLICK')
                                                    }} alt="time">
                                                        <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
                                                        <use href={
                                                            likes(track) === track.id ? `${sprite}#icon-like-liked` : `${sprite}#icon-like`
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
                    </S.CentralBlockContent>
                </S.MainCenterBlock>
                <Sidebar user={user} />
            </S.Main>
        </S.Container>
    </S.Wrapper >

    );


}