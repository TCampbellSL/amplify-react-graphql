import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
} from "@aws-amplify/ui-react";
import Notes from "./notes/notes";
import Navbar from "./navbar/navbar";

// From ChatGPT:
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports"; // The path may vary
import Home from "./home/home";
import AddNote from "./notes/addNote"

Amplify.configure(awsExports);

const App = ({ signOut }) => {
  return (
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/addnote" element={<AddNote />} />
        </Routes>
      </BrowserRouter>
  );
};

export default withAuthenticator(App);
