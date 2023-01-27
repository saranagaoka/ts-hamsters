import React, { useCallback, useContext } from "react";
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
    (a) => a.hamster != undefined && a.adult === true
  ).length;

  return (
    <div className="options">
      <button
        className={`buy__aquarium ${
          aquariums.length == 10 || coins < 30 ? "disabledButton" : ""
        }`}
        onClick={buyAquarium}
        disabled={aquariums.length == 10 || coins < 30}
      >
        Buy new tank $30
      </button>
      <button
        className={`buy__randomHamster ${
          coins < 10 || !freeAquariums() ? "disabledButton" : ""
        }`}
        onClick={buyHamster}
        disabled={coins < 10 || !freeAquariums()}
      >
        Buy random hamster $10
      </button>

      <button
        className={`reproduce ${
          coins < 3 || !freeAquariums() || numberOfAdultHamsters <= 1
            ? "disabledButton"
            : ""
        }`}
        onClick={reproduce}
        disabled={coins < 3 || !freeAquariums() || numberOfAdultHamsters <= 1}
      >
        Reproduce $3
      </button>

      <p> ${coins}</p>
    </div>
  );
}

export default Options;
