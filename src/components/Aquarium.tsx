import React, { useContext, useEffect } from "react";
import { IAquarium, HamsterContext } from "../Context/HamsterContext";
import "./Aquarium.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  adultHamsterBaseSellPrice,
  babyHamsterSellPrice,
  feedPrice,
  hungerTime,
  timeTillAdult,
  unalivedHamsterPrice,
} from "../constants";

const picture1 = require("../images/hamster1.png");
const picture2 = require("../images/hamster2.png");
const picture3 = require("../images/hamster3.png");
const picture4 = require("../images/hamster4.png");
const picture5 = require("../images/hamster6.png");
const hamsterWheel = require("../images/hamster-wheel.png");

const pictureArr = [picture1, picture2, picture3, picture4, picture5];

function Aquarium({ aqua }: { aqua: IAquarium }) {
  const { sellHamster, feedHamster, coins, getHamsterHungry } =
    useContext(HamsterContext);
  const feed = () => {
    feedHamster(aqua.id);
  };
  const sell = () => {
    sellHamster(aqua.id);
  };
  const isAdult = timeTillAdult - (Date.now() - aqua.createdAt) < 0;
  const hamsterPrice = aqua.hamster!;
  const unalived = aqua.fed === 0;

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (aqua.createdAt)
      interval = setInterval(() => {
        getHamsterHungry(aqua.id);
      }, hungerTime);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aqua.createdAt]);

  return (
    <div className="aquarium">
      <div className="aquarium__top">
        {aqua.hamster !== undefined && (
          <>
            {[...Array(aqua.fed)].map((_, i) => (
              <FavoriteIcon
                key={i}
                className={`aquarium__redHearts ${
                  aqua.fed === 1 ? "lastHeart" : ""
                }`}
              />
            ))}
            {[...Array(5 - aqua.fed)].map((_, i) => (
              <FavoriteBorderIcon key={i} />
            ))}
          </>
        )}

        {aqua.hamster !== undefined && (
          <img
            className={`aquarium__picture ${isAdult ? "" : "child"} ${
              unalived ? "unalived" : ""
            }`}
            src={pictureArr[aqua.hamster]}
            alt="some cute hamster"
          />
        )}
        <img
          src={hamsterWheel}
          className="aquarium__wheel"
          alt="hamster wheel"
        />
      </div>
      <div className="aquarium__bottom">
        {aqua.hamster !== undefined && (
          <>
            <button
              className={`aquarium__feedButton ${
                aqua.fed === 5 || coins < feedPrice ? "disabledButton" : ""
              }`}
              onClick={feed}
              disabled={aqua.fed === 5 || coins < feedPrice}
            >
              Feed ${feedPrice}
            </button>
            <button className="aquarium__sell" onClick={sell}>
              Sell {unalived ? "-" : "+"}$
              {unalived
                ? unalivedHamsterPrice
                : isAdult
                ? adultHamsterBaseSellPrice + hamsterPrice
                : babyHamsterSellPrice}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Aquarium;
