import React, { useContext } from "react";
import { pictureArr } from "../constants";
import { HamsterContext } from "../Context/HamsterContext";
import "./HamsterGoal.scss";

function HamsterGoal() {
  const { aquariums } = useContext(HamsterContext);
  const hamsterArr = aquariums.map((el) => el.hamster);
  const ownedHamsters = [
    ...new Set(hamsterArr.filter((el) => el !== undefined)),
  ];
  console.log(ownedHamsters);
  return (
    <div className="hamsterGoal">
      <div className="hamsterGoal__hamster">
        {pictureArr.map((pic, i) => {
          return (
            <img
              className={hamsterArr.includes(i) ? "" : "grayedOut"}
              src={pic}
              alt="hamster"
            />
          );
        })}
      </div>
      {ownedHamsters.length >= 5 && (
        <div className="hamsterGoal__completed">Goal completed!</div>
      )}
    </div>
  );
}

export default HamsterGoal;
