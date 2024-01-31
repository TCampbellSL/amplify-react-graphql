import React from "react";
import "./navbar.css";
import { View } from "@aws-amplify/ui-react";

export default function Navbar() {
  return (
    <View className="Navbar">
      <div className="navbar" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="/home">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/notes">
              Notes
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/addnote">
              Add Note
            </a>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="/collection"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Collections
            </a>
          </li>
        </ul>
      </div>
    </View>
  );
}
