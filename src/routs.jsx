import { Routes, Route } from "react-router-dom";
import { ErrPage } from './Pages/errPage/notfound';
import { MainPage } from "./Pages/mainPage/main";
import { LoginPage } from './Pages/loginPage/login';
import { RegPage } from './Pages/loginPage/registration';
import { Favorites} from './Pages/myListPage/favorites';
import { PlayListPage} from './Pages/playListsPage/category';
import { Account } from "./Pages/Account/index";
import { ProtectedRoute } from "./components/protected/index";
import AuthPage from "./Pages/loginPage/AuthPage";
import AuthPageReg from "./Pages/loginPage/registration";


export function AppRoutes ({status, setStatus, user, setUser,playerOn, setPlayerOn, setUserName, setUserPass, isLoginMode,setIsLoginMode, listName, setListName, tracks, setTracks}){
return(
<Routes>
<Route  path="*" element ={<ErrPage/>}/>
<Route  path="/login" element ={<AuthPage isLoginMode={isLoginMode} setIsLoginMode={setIsLoginMode} setUserPass={setUserPass} user={user} setUser={setUser} setUserName={setUserName} />}/>
<Route element ={<ProtectedRoute isAllowed={Boolean(user)}/>}>
<Route path="/account" element = {<Account/>}/>
<Route  path="/:id" element ={<Favorites
tracks={tracks} setTracks={setTracks} 
status={status} setStatus={setStatus}
listName={listName} setListName={setListName} user={user} setUser={setUser} playerOn={playerOn} setPlayerOn={setPlayerOn}/>}/>
<Route  path="/category/:id" element ={<PlayListPage status={status} setStatus={setStatus} listName={listName} setListName={setListName} setPlayerOn={setPlayerOn}/>}/>
<Route  path="/" element ={<MainPage
tracks={tracks} setTracks={setTracks}  
status={status} setStatus={setStatus}
listName={listName} setListName={setListName} user={user} setUser={setUser} playerOn={playerOn} setPlayerOn={setPlayerOn}/>}/>
</Route>
</Routes>
)
}