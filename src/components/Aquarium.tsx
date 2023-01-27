import React, { useContext } from "react";
import { IAquarium, HamsterContext } from "../Context/HamsterContext";
import "./Aquarium.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const picture1 = require("../images/hamster1.png");
const picture2 = require("../images/hamster2.png");
const picture3 = require("../images/hamster3.png");
const picture4 = require("../images/hamster4.png");
const picture5 = require("../images/hamster6.png");
const hamsterWheel = require("../images/hamster-wheel.png");

const pictureArr = [picture1, picture2, picture3, picture4, picture5];

function Aquarium({ aqua }: { aqua: IAquarium }) {
  const { sellHamster, feedHamster, coins } = useContext(HamsterContext);
  const feed = () => {
    feedHamster(aqua.id);
  };
  const sell = () => {
    sellHamster(aqua.id);
  };
  return (
    <div className="aquarium">
      <div className="aquarium__top">
        {aqua.hamster != undefined && (
          <>
            {[...Array(aqua.fed)].map((_, i) => (
              <FavoriteIcon key={i} style={{ color: "red" }} />
            ))}
            {[...Array(5 - aqua.fed)].map((_, i) => (
              <FavoriteBorderIcon key={i} />
            ))}
          </>
        )}

        {aqua.hamster != undefined && (
          <img
            className={`aquarium__picture ${aqua.adult ? "" : "child"}`}
            src={pictureArr[aqua.hamster]}
          />
        )}
        <img src={hamsterWheel} className="aquarium__wheel" />
      </div>
      <div className="aquarium__bottom">
        {aqua.hamster != undefined && (
          <>
            <button
              className={`aquarium__feedButton ${
                aqua.fed === 5 ? "disabledButton" : ""
              }`}
              onClick={feed}
              disabled={aqua.fed === 5 || coins < 5}
            >
              Feed $5
            </button>
            <button className="aquarium__sell" onClick={sell}>
              Sell +$5
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Aquarium;
