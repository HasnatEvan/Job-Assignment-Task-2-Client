import {
    createBrowserRouter,

} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Home/Home";
import Wishlist from "../Wishlist/Wishlist";
import BookDetails from "../BookDetails/BookDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/wishlist',
                element:<Wishlist></Wishlist>
            },
            {
                path:'/book/:id',
                element:<BookDetails></BookDetails>
            }
        ]
    },
]);