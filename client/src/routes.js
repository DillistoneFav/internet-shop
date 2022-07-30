import AdminPanel from "./pages/AdminPanel/AdminPanel"
import Auth from "./pages/Authentification/Auth"
import Cart from "./pages/Cart/Cart"
import DevicePage from "./pages/DevicePage/DevicePage"
import Error from "./pages/Error/Error"
import Shop from "./pages/Shop/Shop"
import { ADMIN_ROUTE, CART_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, ERROR_ROUTE } from "./utils/constants"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: AdminPanel
    },
    {
        path: CART_ROUTE,
        Component: Cart
    },
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: `${DEVICE_ROUTE}/:id`,
        Component: DevicePage,
    },
    {
        path: ERROR_ROUTE,
        Component: Error,
    },
]