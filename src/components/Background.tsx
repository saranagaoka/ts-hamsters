import React, { useContext } from "react";
import { HamsterContext } from "../Context/HamsterContext";
import Aquarium from "./Aquarium";
import "./Background.scss";
import HamsterGoal from "./HamsterGoal";
import Options from "./Options";

function Background() {
  const { aquariums } = useContext(HamsterContext);

  return (
    <div className="background">
      <div className="background__options">
        <HamsterGoal />

        <Options />
      </div>
      <div className="background__shelf">
        {aquariums.slice(0, 5).map((aqua) => (
          <Aquarium aqua={aqua} key={aqua.id} />
        ))}
      </div>
      <div className="background__shelf">
        {aquariums.slice(5).map((aqua) => (
          <Aquarium aqua={aqua} key={aqua.id} />
        ))}
      </div>
    </div>
  );
}

export default Background;
