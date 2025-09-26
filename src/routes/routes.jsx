import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
// import { Home } from "../pages/Home";
// import RoomsPage from "../pages/rooms";
// import HotelsPage from "../pages/hotels";
import  Dashboard  from "../pages/dashboard";
import RoomsPage from "../pages/rooms";
import { Dashboardlayout } from "../layout/dashboardlayout";
import Booking from "../pages/bookings";
import Hotel from "../pages/hotels";
import HotelEdit from "../pages/hotelEdit";
import RoomEdit from "../pages/roomedit";



import Admin from "../pages/admin_dashboard/dashboard";
import { AdminDashboard } from "../layout/adminlayout";
import AdminHotelList from "../pages/admin_dashboard/hotels";
import AdminRoomsPage from "../pages/admin_dashboard/rooms";
import { Login } from "../pages/login";
import AdminBooking from "../pages/admin_dashboard/bookings";
import AdminCustomers from "../pages/admin_dashboard/customer";
// import Sidebar from "../components/sidebar";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboardlayout />,

      children: [
        {
        path : "/",
        element: < Dashboard/>
        },
        {
            path:'login',
            element:< Login />
        },
        {
            path:"rooms/:hotel_id",
            element:<RoomsPage />
        },
        {
            path: "hotels",
            element: <Hotel />
        },
        {
            path:"bookings",
            element:<Booking />
        },
        {
            path:"hoteledit/:id",
            element:<HotelEdit />
        },
        {
            path:"roomedit/:id",
            element:<RoomEdit />
        }
      ]


    },
        {
            path:'/admin',
            element:<AdminDashboard/>,

            children:[
                {
                    path:'/admin',
                    element:< Admin/>
                },
                {
                    path:'hotellist',
                    element:<AdminHotelList />           
                },
                {
                    path:'room/:hotel_id',
                    element:<AdminRoomsPage />
                },
                {
                    path:"roomedit/:id",
                    element:<RoomEdit />
                },

                {
                    path:"booking",
                    element:<AdminBooking />
                },
                {
                    path:"customer",
                    element:< AdminCustomers />
                }

            ]
        }
        
            

  ]);

 