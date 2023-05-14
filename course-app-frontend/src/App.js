import "./App.css";
import React from "react";
// import { Route, Routes, Navigate } from 'react-router-dom';
// import Homepage from "./components/HomePage/Homepage";
// import PostDetail from "./components/Posts/PostDetail";
// import PostList from "./components/Posts/PostList";
// import PostForm from "./components/Posts/PostForm";
import { Outlet } from "react-router-dom";
import MainNavigation from "./components/MainNavigation";

// const router = createBrowserRouter([
//   {path: '/', element: <Homepage />, children: [
//     {path: '/posts', element: <PostForm />},
//     {path: '/posts', element: <PostList />}
//   ]},
//   {path: '/posts/:post_id', element: <PostDetail />}
// ]);

// function App() {
//   return <RouterProvider router={router} />
// }

// function App() {
//   return (
//     <div>
//       <Routes>
//         <Route path="/" exact element={<Navigate to="/posts" />} />
//         <Route path="/posts" exact element={<Homepage />}/>
//         <Route path="/posts/:post_id" element={<PostDetail />} />
//       </Routes>
//     </div>
//   );
// }

function App() {
  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  );
}

export default App;
