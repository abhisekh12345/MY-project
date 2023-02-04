import React from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Error, Register, Landing ,ProctectedRoute} from "./pages"
import { ALLJobs, AddJob, Profile, SharedLayout, Stats } from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element ={
          
          <ProctectedRoute>
            <SharedLayout />
          </ProctectedRoute>

        }>
          <Route index element = {<Stats />} />
          <Route path= "all-jobs" element = {<ALLJobs />} />
          <Route path= "add-job" element = {<AddJob />} />
          <Route path= "profile" element = {<Profile />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
