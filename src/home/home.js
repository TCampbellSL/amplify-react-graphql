import React, { useState, useEffect } from "react";
import "./home.css";
import "@aws-amplify/ui-react/styles.css";
import { View } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/api";
import { getCollection } from "../graphql/queries";
// From ChatGPT:

const Home = () => {

  return (
    <div>
      <View className="Home">
        <h1>My Notes App</h1>
        <p>This is the home page</p>
      </View>
    </div>
  );
};

export default Home;
