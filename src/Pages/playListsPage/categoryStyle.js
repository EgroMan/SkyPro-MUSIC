import styled from "styled-components";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import {useSelector} from "react-redux";



//main
export const CentralBlockContent = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
`;

export const Main=styled.div`
-webkit-box-flex: 1;
-ms-flex: 1 1 auto;
flex: 1 1 auto;
display: -webkit-box;
display: -ms-flexbox;
display: flex;
-ms-flex-wrap: wrap;
flex-wrap: wrap;
-webkit-box-pack: justify;
-ms-flex-pack: justify;
justify-content: space-between;
`

export const MainCenterBlock=styled.div`
width: auto;
-webkit-box-flex: 3;
-ms-flex-positive: 3;
flex-grow: 3;
padding: 20px 40px 20px 111px;
`
export const Wrapper=styled.div`
width: 100%;
min-height: 100%;
overflow: hidden;
background-color: #383838;
`
export const Container=styled.div`
max-width: 1920px;
height: 100vh;
margin: 0 auto;
position: relative;
background-color: #181818;
`
//main ands


export const FavoritesBlockContent = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
 
`;
export const CentralBlockContentTitle = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin-bottom: 24px;
  
`;

export const CentralBlock_playlistTitle = styled(
  CentralBlockContentTitle
)``;

export const CentralBlockContentPlaylist = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  overflow-y: auto;
`;
export const PlaylistTitleCol = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 2px;
  color: #696969;
  text-transform: uppercase;
`;
export const PlaylistTitleCol01 = styled(PlaylistTitleCol)`
  width: 447px;
`;
export const PlaylistTitleCol02 = styled(PlaylistTitleCol)`
  width: 321px;
`;
export const PlaylistTitleCol03 = styled(PlaylistTitleCol)`
  width: 245px;
`;
export const PlaylistTitleCol04 = styled(PlaylistTitleCol)`
  width: 60px;
  text-align: end;
`;

export const Playlist__item = styled.div`
  width: 100%;
  display: block;
  margin-bottom: 12px;
`;

export const Playlist__track = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
`;
export const Track__titleSpan = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #4e4e4e;
`;
export const Track__title = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 447px;
`;
export const Track__titleImage = styled.div`
  width: 51px;
  height: 51px;
  padding: 16px;
  background: #313131;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin-right: 17px;
`;
export const Track__authorLink = styled.a`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  text-align: left;
`;
export const Track__titleLink = styled.a`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
`;
export const Playlist__titleSvg = styled.svg`
width: 12px;
height: 12px;
fill: transparent;
stroke: #696969;
`
;


export const Track__titleSvg = styled.svg`
  width: 18px;
  height: 17px;
  fill: transparent;
  stroke: #4e4e4e;

   


`;


export const Playlist__titleSvg_dot = styled(Track__titleSvg)`
width: 16px;
height: 16px;
background-color: #b672ff;
border-radius: 8px;
display: block;
animation: bubble_out 0.6s ease-in-out infinite both;

@keyframes bubble_out {
  0%,
  to {
    transform: scale(0.5);
  }
  50% {
    transform: scale(1);
  }
}

`



;


export const Playlist__titleSvg_dot_Pause = styled(Track__titleSvg)`
width: 16px;
height: 16px;
background-color: #b672ff;
border-radius: 8px;
display: block;
// animation: bubble_out 0.6s ease-in-out infinite both;

// @keyframes bubble_out {
//   0%,
//   to {
//     transform: scale(0.5);
//   }
//   50% {
//     transform: scale(1);
//   }
// }

`



;
export const Track__author = styled.div`
  width: 321px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
`;
export const Track__album = styled.div`
  width: 245px;
`;
export const Track_titleText = styled.div``;
export const Track__albumLink = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #696969;
`;
export const Track_time = styled.div``;

export const Track__timeSvg = styled.svg`
  width: 14px;
  height: 12px;
  margin-right: 17px;
  fill: transparent;
  stroke: #696969;
`;
export const Track__timeText = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: right;
  color: #696969;
`;
export const Skeleton_square = styled(Skeleton)`
  width: 50px;
  height: 50px;
  background-color: rgb(115, 111, 111);
`;
export const Skeleton_line = styled(Skeleton)`
  width: 250px;
  height: 30px;
  background-color: gray;
`;

export const Skeleton_lineMini = styled(Skeleton)`
  margin-top: 20px;
  width: 50px;
  height: 25px;
  background-color: #202020;
`;
export const Skeleton_displayNo = styled(Skeleton)`
  display: none;
`;