// import "./App.css";
// import React, { useState, useEffect } from "react";
// import { createHashRouter, RouterProvider } from "react-router-dom";
// import loadinggiv from "./img/Gennify.gif";
// import Layout from "./component/Layout";
// import Register from "./component/Register";
// import ReactLoading from "react-loading";
// import { jwtDecode } from "jwt-decode";
// import Login from "./component/Login ";
// import Home from "./component/Home";

// import Errormsg from "./component/Errormsg";
// import About from "./component/About";
// import TrendingAndCategProvider from './CONTEXT/trendingandcateg'; // Adjust path if necessary
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Products from "./component/Products";
// import Detaproduct from "./component/Detaproduct";
// import Cart from "./component/Cart";
// import Footer from "./component/Footer";
// import { Offline, Online } from "react-detect-offline";

// function App() {
//   const [isLogin, setIsLogin] = useState(false);
//   const [username, setUsername] = useState("");
//   const [isLoading, setIsLoading] = useState(true);

//   const routes = createHashRouter([
//     {
//       path: "/",
//       element: (
//         <Layout username={username} setIsLogin={setIsLogin} isLogin={isLogin} />
//       ),
//       children: [
//         { index: true, element: isLogin ? <Home /> : <Register /> },
//         { path: "login", element: <Login isLogin={isLogin} setIsLogin={setIsLogin} /> },
//         { path: "register", element: <Register /> },
//         { path: "home", element: <Home username={username} /> }, // Use lowercase
//         { path: "*", element: <Errormsg /> },
//         { path: "About", element: <About /> },
//         { path: "Products", element: <Products /> },
//         { path: "Detaproduct/:productid", element: <Detaproduct /> },
//         { path: "Cart", element: <Cart /> },



//       ],
//     },
//   ]);

//   // useEffect(() => {
//   //   const token = localStorage.getItem("token");
//   //   if (token) {
//   //     try {
//   //       const usernameInfo = jwtDecode(token);
//   //       console.log("Decoded username info:", usernameInfo); // Add this line
//   //       setUsername(usernameInfo.first_name);
//   //       setIsLogin(true);
//   //     } catch (error) {
//   //       console.error("Token decoding error:", error);
//   //     }
//   //   }
//   //   setIsLoading(true);
//   // }, [isLogin]);

//   // React.useEffect(() => {
//   //   const timer = setTimeout(() => {
//   //     setIsLoading(false);
//   //   }, 6000); // Change the time to simulate loading time
//   //   return () => clearTimeout(timer);
//   // }, []);
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const usernameInfo = jwtDecode(token);
//         console.log("Decoded username info:", usernameInfo); // Add this line
//         setUsername(usernameInfo.first_name);
//         setIsLogin(true);
//       } catch (error) {
//         console.error("Token decoding error:", error);
//       }
//     }
//     setIsLoading(true); // You can move this outside the condition if it should always load initially
//   }, []); // <- Empty dependency array means it only runs once when the component mounts
  
//   React.useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 8000); // Simulate loading time
//     return () => clearTimeout(timer);
//   }, []); // <- Also an empty dependency array, to run this effect only once on mount
  
//   return <>
//  {isLoading ? <Loading /> : 
//   <TrendingAndCategProvider>
//     <RouterProvider router={routes} />
//   </TrendingAndCategProvider>
// }

   
//     <Offline><div className="offline-container d-flex justify-content-center align-items-center vh-100">
//   <div className="text-center">
//     <i className="fas fa-wifi-slash offline-icon mb-3"></i>
//     <h2 className="mb-2">You're Offline!</h2>
//     <p>Oops, it seems you're not connected to the internet.</p>
//   </div>
// </div>
// </Offline>
  
// </>
// }

// function Loading() {
//   return (
//     <div className="loading-container text-center d-flex justify-content-center align-items-center vh-100 ">
//     <div className="d-flex flex-column justify-content-center align-items-center vh-100">
//       {/* <video className="loading-video h-100 w-100" autoPlay loop muted>
//         <source src={loadingVideo} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video> */}
//       <img src={loadinggiv} className="loading-video vh-100   p-5" />
//     </div>
//   </div>
//   );
// }
// export default App;
import "./App.css";
import React, { useState, useEffect } from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import loadinggiv from "./img/Gennify.gif";
import Layout from "./component/Layout";
import Register from "./component/Register";
import { jwtDecode } from "jwt-decode";
import Login from "./component/Login ";
import Home from "./component/Home";
import Errormsg from "./component/Errormsg";
import About from "./component/About";
import TrendingAndCategProvider from './CONTEXT/trendingandcateg'; // Adjust path if necessary
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Products from "./component/Products";
import Detaproduct from "./component/Detaproduct";
import Cart from "./component/Cart";
import Footer from "./component/Footer";
import { Offline, Online } from "react-detect-offline";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  const routes = createHashRouter([
    {
      path: "/",
      element: (
        <Layout username={username} setIsLogin={setIsLogin} isLogin={isLogin} />
      ),
      children: [
        { index: true, element: isLogin ? <Home /> : <Register /> },
        { path: "login", element: <Login isLogin={isLogin} setIsLogin={setIsLogin} /> },
        { path: "register", element: <Register /> },
        { path: "home", element: <Home username={username} /> },
        { path: "*", element: <Errormsg /> },
        { path: "About", element: <About /> },
        { path: "Products", element: <Products /> },
        { path: "Detaproduct/:productid", element: <Detaproduct /> },
        { path: "Cart", element: <Cart /> },
      ],
    },
  ]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const usernameInfo = jwtDecode(token);
        console.log("Decoded username info:", usernameInfo);
        setUsername(usernameInfo.first_name);
        setIsLogin(true);
      } catch (error) {
        console.error("Token decoding error:", error);
      }
    }
    setIsLoading(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 8000); // Simulate loading time
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <TrendingAndCategProvider>
          <RouterProvider router={routes} />
        </TrendingAndCategProvider>
      )}
      {isOffline && (
        <div className="offline-container d-flex justify-content-center align-items-center vh-100">
          <div className="text-center">
            <i className="fas fa-wifi-slash offline-icon mb-3"></i>
            <h2 className="mb-2">You're Offline!</h2>
            <p>Oops, it seems you're not connected to the internet.</p>
          </div>
        </div>
      )}
    </>
  );
}

function Loading() {
  return (
    <div className="loading-container text-center d-flex justify-content-center align-items-center vh-100">
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <img src={loadinggiv} className="loading-video vh-100 p-5" />
      </div>
    </div>
  );
}

export default App;
