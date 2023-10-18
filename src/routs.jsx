import React from "react";
import { Routes, Route } from "react-router-dom";
import { ErrPage } from './Pages/errPage/notfound';
import { MainPage } from "./Pages/mainPage/main";
import { LoginPage } from './Pages/loginPage/login';
import { RegPage } from './Pages/loginPage/registration';
import { MyListPage } from './Pages/myListPage/favorites';
import { PlayListPage} from './Pages/playListsPage/category';
import { Account } from "./Pages/Account/index";
import { ProtectedRoute } from "./components/protected/index";
import AuthPage from "./Pages/loginPage/AuthPage";
import AuthPageReg from "./Pages/loginPage/registration";


export function AppRoutes ({user, setUser,playerOn, setPlayerOn, setUserName, setUserPass, isLoginMode,setIsLoginMode}){
    console.log(Boolean(user))
return(
<Routes>
<Route  path="*" element ={<ErrPage/>}/>
<Route  path="/login" element ={<AuthPage isLoginMode={isLoginMode} setIsLoginMode={setIsLoginMode} setUserPass={setUserPass} user={user} setUser={setUser} setUserName={setUserName} />}/>


<Route element ={<ProtectedRoute isAllowed={Boolean(user)}/>}>
<Route path="/account" element = {<Account/>}/>
<Route  path="/favorites" element ={<MyListPage/>}/>
<Route  path="/category/:id" element ={<PlayListPage/>}/>
<Route  path="/" element ={<MainPage user={user} setUser={setUser} playerOn={playerOn} setPlayerOn={setPlayerOn}/>}/>
</Route>

</Routes>

)
}