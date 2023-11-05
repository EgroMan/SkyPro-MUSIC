import { Navigate, Outlet } from "react-router-dom"
import { UserContext } from "../../App"


export const ProtectedRoute =({redirectPath ="/login", isAllowed} )=>{

    let userLoginName = localStorage.getItem('userName')
    isAllowed=Boolean(userLoginName)
    if (!isAllowed) {
    return(<Navigate to={redirectPath} replace={true}/>
    )
}
return <Outlet/>
}