import {React, Navigate, Outlet } from "react-router-dom"
import { UserContext } from "../../App"


export const ProtectedRoute =({redirectPath ="/login", isAllowed} )=>{
   
console.log(UserContext.Consumer)

    let userLoginName = localStorage.getItem('userName')
    isAllowed=Boolean(userLoginName)
    console.log(isAllowed)
    if (!isAllowed) {
    return(<Navigate to={redirectPath} replace={true}/>
   
    )
}
return <Outlet/>
}