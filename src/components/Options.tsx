import React, { useCallback, useContext } from "react";
import {
  adultHamsterBuyPrice,
  aquariumPrice,
  reproducePrice,
  timeTillAdult,
} from "../constants";
import { HamsterContext } from "../Context/HamsterContext";
import "./Options.scss";

function Options() {
  const { coins, buyAquarium, aquariums, buyHamster, reproduce } =
    useContext(HamsterContext);
  const freeAquariums = useCallback(
    () => aquariums.filter((a) => a.hamster === undefined).length > 0,
    [aquariums]
  );
  const numberOfAdultHamsters = aquariums.filter(
    (a) => a.hamster !== undefined && Date.now() - a.createdAt > timeTillAdult
  ).length;

  return (
    <div className="options">
      <button
        className={`buy__aquarium ${
          aquariums.length === 10 || coins < aquariumPrice
            ? "disabledButton"
            : ""
        }`}
        onClick={buyAquarium}
        disabled={aquariums.length === 10 || coins < aquariumPrice}
      >
        Buy new tank ${aquariumPrice}
      </button>
      <button
        className={`buy__randomHamster ${
          coins < adultHamsterBuyPrice || !freeAquariums()
            ? "disabledButton"
            : ""
        }`}
        onClick={buyHamster}
        disabled={coins < adultHamsterBuyPrice || !freeAquariums()}
      >
        Buy random hamster ${adultHamsterBuyPrice}
      </button>

      <button
        className={`reproduce ${
          coins < reproducePrice ||
          !freeAquariums() ||
          numberOfAdultHamsters <= 1
            ? "disabledButton"
            : ""
        }`}
        onClick={reproduce}
        disabled={
          coins < reproducePrice ||
          !freeAquariums() ||
          numberOfAdultHamsters <= 1
        }
      >
        Reproduce ${reproducePrice}
      </button>

      <p> ${coins}</p>
    </div>
  );
}

export default Options;
