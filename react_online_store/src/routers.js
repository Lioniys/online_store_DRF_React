import {DEVISE_ROUTE, SHOP_ROUTE} from "./consts";
import Shop from "./pages/Shop";
import ProductPage from "./pages/ProductPage";


export const publicRouters = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: DEVISE_ROUTE + '/:id',
        Component: ProductPage
    },
]