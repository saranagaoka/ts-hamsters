import React from "react";
import Aquarium from "./Aquarium";
import "./Background.scss";
import Options from "./Options";

function Background() {
  return (
    <div className="background">
      <div className="background__options">
        <Options />
      </div>
      <div className="background__shelf">
        {[...Array(5)].map((_) => (
          <Aquarium />
        ))}
      </div>
      <div className="background__shelf">
        {[...Array(5)].map((_) => (
          <Aquarium />
        ))}
      </div>
    </div>
  );
}

export default Background;
