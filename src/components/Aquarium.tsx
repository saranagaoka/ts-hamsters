import React from "react";
import "./Aquarium.scss";

const picture1 = require("../images/hamster1.png");
const picture2 = require("../images/hamster2.png");
const picture3 = require("../images/hamster3.png");
const picture4 = require("../images/hamster4.png");
const picture5 = require("../images/hamsterwheel5.png");
const picture6 = require("../images/hamster6.png");
const picture7 = require("../images/hamsterwheel7.png");
const picture8 = require("../images/hamster-ball.png");

const pictureArr = [
  picture1,
  picture2,
  picture3,
  picture4,
  picture5,
  picture6,
  picture7,
  picture8,
];

function Aquarium() {
  return (
    <div className="aquarium">
      <div className="aquarium__top">
        <img className="aquarium__picture" src={picture1} />
      </div>
      <div className="aquarium__bottom">
        <button className="aquarium__feedButton">Feed 10$</button>
      </div>
    </div>
  );
}

export default Aquarium;
