import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import {
  lazy,
  Suspense
} from 'react'
import Dashboard from "./pages/DashBoard";
import Send from "./pages/Send";
import React from "react";
import { RecoilRoot } from 'recoil'

const Signin = lazy(() => import("./pages/Signin"));
const Signup = lazy((() => import("./pages/Signup")));

function App() {

  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Suspense fallback={<div> loading... </div>}> <Signup /> </Suspense>} />
            <Route path="/signin" element={<Suspense fallback={<div>Loading...</div>}> <Signin /> </Suspense>} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/send" element={<Send />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  )
}

export default App
