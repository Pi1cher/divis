import {createBrowserRouter, Navigate} from "react-router-dom";
import {MainLayout} from "./layouts";
import {MainPage} from "./pages";


const router = createBrowserRouter([
    {
        path:'', element: <MainLayout/>, children:[
            {
                index:true, element:<Navigate to={'main_page'}/>
            },
            {
                path:'main_page', element:<MainPage/>
            }
        ]
    }
])

export {
    router
}