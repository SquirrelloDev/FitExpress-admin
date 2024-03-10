import ReactDOM from 'react-dom/client'
import './sass/main.scss'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import UnauthorizedLayout from "./layouts/UnauthorizedLayout";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import {appRoutes} from "./utils/routes";
import Addresses from "./pages/Addresses/Addresses";
import Diets from "./pages/Diets/Diets";
import Exclusions from "./pages/Exclusions/Exclusions";
import FixedDays from "./pages/Fixed/FixedDays";
import FlexiDays from "./pages/Flexi/FlexiDays";
import Meals from "./pages/Meals/Meals";
import Orders from "./pages/Orders/Orders";
import Promocodes from "./pages/Promocodes/Promocodes";
import Reports from "./pages/Reports/Reports";
import Tags from "./pages/Tags/Tags";
import DeliveryPoints from "./pages/DeliveryPoints/DeliveryPoints";
import {UserRole} from "./utils/userRoles";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./utils/api";
import Users from "./pages/Users/Users";
import UserCreate from "./pages/Users/UserCreate";
import AddressCreate from "./pages/Addresses/AddressCreate";
import DeliveryCreate from "./pages/DeliveryPoints/DeliveryCreate";
import FixedCreate from "./pages/Fixed/FixedCreate";
import FlexiCreate from "./pages/Flexi/FlexiCreate";
import MealCreate from "./pages/Meals/MealCreate";
import PromoCreate from "./pages/Promocodes/PromoCreate";
import TagCreate from "./pages/Tags/TagCreate";
import ExclusionCreate from "./pages/Exclusions/ExclusionCreate";
import {UserEditPage} from "./components/EditForms/UserEditPage";
import {TagEditPage} from "./components/EditForms/TagEditPage";
import {ExclusionEditPage} from "./components/EditForms/ExclusionEditPage";
import {PromocodeEditPage} from "./components/EditForms/PromocodeEditPage";
import {DeliveryEditPage} from "./components/EditForms/DeliveryEditPage";
import {AddressEditPage} from "./components/EditForms/AddressEditPage";
import {MealEditPage} from "./components/EditForms/MealEditPage";
import DietCreate from "./pages/Diets/DietCreate";
import {DietEditPage} from "./components/EditForms/DietEditPage";
import {FixedEditPage} from "./components/EditForms/FixedEditPage";
import {FlexiEditPage} from "./components/EditForms/FlexiEditPage";
import {OrderCreatePage} from "./components/EditForms/OrderCreatePage";
import {OrderEditPage} from "./components/EditForms/OrderEditPage";
import {ReportCreatePage} from "./components/EditForms/ReportCreatePage";
import {ReportEditPage} from "./components/EditForms/ReportEditPage";

const router = createBrowserRouter([
    {
        path: appRoutes.home,
        element: <MainLayout minPermLevel={UserRole.dietetician}/>,
        children: [
            {element: <Home/>, index: true},
        ]
    },
    {
        path: appRoutes.users, element: <MainLayout minPermLevel={UserRole.dietetician}/>, children: [
            {index: true, element: <Users/>},
            {path: appRoutes.create, element: <UserCreate/>},
            {path: appRoutes.editById, element: <UserEditPage/>}
        ]
    }, {
        path: appRoutes.addresses, element: <MainLayout minPermLevel={UserRole.dietetician}/>, children: [
            {index: true, element: <Addresses/>},
            {path: appRoutes.create, element: <AddressCreate/>},
            {path: appRoutes.editById, element: <AddressEditPage/>}
        ]
    }, {
        path: appRoutes.diets, element: <MainLayout minPermLevel={UserRole.dietetician}/>, children: [
            {index: true, element: <Diets/>},
            {path: appRoutes.create, element: <DietCreate/>},
            {path: appRoutes.editById, element: <DietEditPage/>}
        ]
    }, {
        path: appRoutes.fixedDays, element: <MainLayout minPermLevel={UserRole.dietetician}/>, children: [
            {index: true, element: <FixedDays/>},
            {path: appRoutes.create, element: <FixedCreate/>},
            {path: appRoutes.editById, element: <FixedEditPage/>}
        ]
    }, {
        path: appRoutes.flexiDays, element: <MainLayout minPermLevel={UserRole.dietetician}/>, children: [
            {index: true, element: <FlexiDays/>},
            {path: appRoutes.create, element: <FlexiCreate/>},
            {path: appRoutes.editById, element: <FlexiEditPage/>}
        ]
    }, {
        path: appRoutes.meals, element: <MainLayout minPermLevel={UserRole.dietetician}/>, children: [
            {index: true, element: <Meals/>},
            {path: appRoutes.create, element: <MealCreate/>},
            {path: appRoutes.editById, element: <MealEditPage/>}
        ]
    }, {
        path: appRoutes.orders, element: <MainLayout minPermLevel={UserRole.dietetician}/>, children: [
            {index: true, element: <Orders/>},
            {path: appRoutes.create, element: <OrderCreatePage/>},
            {path: appRoutes.editById, element: <OrderEditPage/>}
        ]
    }, {
        path: appRoutes.promocodes, element: <MainLayout minPermLevel={UserRole.dietetician}/>, children: [
            {index: true, element: <Promocodes/>},
            {path: appRoutes.create, element: <PromoCreate/>},
            {path: appRoutes.editById, element: <PromocodeEditPage/>}
        ]
    }, {
        path: appRoutes.reports, element: <MainLayout minPermLevel={UserRole.dietetician}/>, children: [
            {index: true, element: <Reports/>},
            {path: appRoutes.create, element: <ReportCreatePage/>},
            {path: appRoutes.editById, element: <ReportEditPage/>}
        ]
    }, {
        path: appRoutes.tags, element: <MainLayout minPermLevel={UserRole.dietetician}/>, children: [
            {index: true, element: <Tags/>},
            {path: appRoutes.create, element: <TagCreate/>},
            {path: appRoutes.editById, element: <TagEditPage/>}
        ]
    },
    {
        path: appRoutes.exclusions, element: <MainLayout minPermLevel={UserRole.dietetician}/>, children: [
            {index: true, element: <Exclusions/>},
            {path: appRoutes.create, element: <ExclusionCreate/>},
            {path: appRoutes.editById, element: <ExclusionEditPage/>}
        ]
    },
    {
        path: appRoutes.delivery,
        element: <MainLayout minPermLevel={UserRole.dietetician}/>,
        children: [
            {element: <DeliveryPoints/>, index: true},
            {path: appRoutes.create, element: <DeliveryCreate />},
            {path: appRoutes.editById, element: <DeliveryEditPage />}
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
    <>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
        </QueryClientProvider>
    </>,
)
