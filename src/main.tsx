import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import UnauthorizedLayout from "./layouts/UnauthorizedLayout";
import {NotFound} from "./pages/NotFound";
import {Login} from "./pages/Login";
import {Unauthorized} from "./pages/Unauthorized";
import MainLayout from "./layouts/MainLayout";
import {Home} from "./pages/Home";
import {appRoutes} from "./utils/routes";
import {Addresses} from "./pages/Addresses";
import {Diets} from "./pages/Diets";
import {Exclusions} from "./pages/Exclusions";
import {FixedDays} from "./pages/FixedDays";
import {FlexiDays} from "./pages/FlexiDays";
import {Meals} from "./pages/Meals";
import {Orders} from "./pages/Orders";
import {Promocodes} from "./pages/Promocodes";
import {Reports} from "./pages/Reports";
import {Tags} from "./pages/Tags";
import {Users} from "./pages/Users";
import {DeliveryPoints} from "./pages/DeliveryPoints";
import {UserRole} from "./utils/userRoles";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./utils/api";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const router = createBrowserRouter([
    {
        path: appRoutes.home,
        element: <MainLayout minPermLevel={UserRole.dietetician}/>,
        children: [
            {element: <Home/>, index: true},
            {path: appRoutes.addresses, element: <Addresses/>},
            {path: appRoutes.diets, element: <Diets/>},
            {path: appRoutes.exclusions, element: <Exclusions/>},
            {path: appRoutes.fixedDays, element: <FixedDays/>},
            {path: appRoutes.flexiDays, element: <FlexiDays/>},
            {path: appRoutes.meals, element: <Meals/>},
            {path: appRoutes.orders, element: <Orders/>},
            {path: appRoutes.promocodes, element: <Promocodes/>},
            {path: appRoutes.reports, element: <Reports/>},
            {path: appRoutes.tags, element: <Tags/>},
            {path: appRoutes.users, element: <Users/>}
        ]
    },
    {
        path: appRoutes.delivery,
        element: <MainLayout minPermLevel={UserRole.dietetician} />,
        children: [
            {element: <DeliveryPoints/>, index: true}
        ]
    },
    {
        path: '/',
        element: <UnauthorizedLayout/>,
        errorElement: <NotFound/>,
        children: [
            {path: appRoutes.login, element: <Login/>},
            {path: appRoutes.notAuthorized, element: <Unauthorized/>},
            {path: "*", element: <NotFound/>}
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <RouterProvider router={router}/>
        </QueryClientProvider>
    </React.StrictMode>,
)
