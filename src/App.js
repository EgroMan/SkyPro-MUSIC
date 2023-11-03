import { createGlobalStyle } from "styled-components";
import { AppRoutes } from "./routs";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Player } from "./components/Audioplayer/AudioPlayer";
import { Nav } from "./components/Navmenu/NavMenu";
export const UserContext = React.createContext(null);

const GlobalStyle = createGlobalStyle`

  *{margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  }
  *&:before,
  *&:after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  a,
  a:visited {
    text-decoration: none;
    font-family: "StratosSkyeng", sans-serif;
    cursor: pointer;
  }
  html,
  body {
    width: 100%;
    height: 100%;
    font-family: "StratosSkyeng", sans-serif;
    color: #ffffff;
  }
  ul li {
    list-style: none;
  }
  
  @font-face {
    font-family: "StratosSkyeng";
    src: local("StratosSkyeng"), local("StratosSkyeng"),
      url("StratosSkyeng.woff2") format("woff2"),
      url("StratosSkyeng.woff") format("woff");
    font-weight: 400;
    font-style: normal;
  }

`;

export function App() {
  const [playerOn, setPlayerOn] = useState("hidden");
  const [user, setUser] = useState(false);
  const [userName, setUserName] = useState(null)
  const [userPass, setUserPass] = useState(null)
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [listName, setListName] = useState('Tracks')
  const [tracks, setTracks] = useState([{ id: "1" }])
  let userLoginName = localStorage.getItem('userName')
  let textName = 'Имя пользователя:'
  let arrNameUser = [userLoginName, textName]

  return (
    <div className="App">
      <UserContext.Provider value={arrNameUser}>
        <AppRoutes
          tracks={tracks} setTracks={setTracks}
          listName={listName} setListName={setListName} isLoginMode={isLoginMode} setIsLoginMode={setIsLoginMode} setUserPass={setUserPass} setUserName={setUserName} user={user} setUser={setUser} playerOn={playerOn} setPlayerOn={setPlayerOn} />
        <Player playerVisibility={playerOn}
        />
      </UserContext.Provider>
      <GlobalStyle />
    </div>
  );
}

export default App;