import { createContext } from "react";
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import {
  adultHamsterBaseSellPrice,
  adultHamsterBuyPrice,
  aquariumPrice,
  babyHamsterSellPrice,
  baseAdultHamsterAge,
  baseCash,
  feedPrice,
  reproducePrice,
  timeTillAdult,
} from "../constants";

export interface IAquarium {
  hamster: number | undefined;
  fed: number;
  id: string;
  createdAt: number;
}

export const HamsterContext = createContext<{
  coins: number;
  aquariums: IAquarium[];
  feedHamster: (id: string) => void;
  sellHamster: (id: string) => void;
  getHamsterHungry: (id: string) => void;
  buyAquarium: () => void;
  buyHamster: () => void;
  reproduce: () => void;
}>({
  coins: 50,
  aquariums: {} as IAquarium[],
  feedHamster: () => {},
  sellHamster: () => {},
  buyAquarium: () => {},
  buyHamster: () => {},
  reproduce: () => {},
  getHamsterHungry: () => {},
});

export const HamsterProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [coins, setCoins] = useState<number>(baseCash);

  const [aquariums, setAquariums] = useState<IAquarium[]>([
    {
      hamster: 4,
      fed: 5,
      id: "0",
      createdAt: Date.now() - timeTillAdult,
    },
  ]);

  const feedHamster = (id: string) => {
    setAquariums((prev) =>
      prev.map((tank) =>
        tank.id === id ? { ...tank, fed: tank.fed + 1 } : tank
      )
    );
    setCoins((prev) => prev - feedPrice);
  };

  const sellHamster = (id: string) => {
    const hamster = aquariums.filter((aq) => aq.id === id)[0];
    const isAdult = timeTillAdult - (Date.now() - hamster.createdAt) < 0;
    setAquariums((prev) => {
      return prev.map((tank) =>
        tank.id === id ? { ...tank, hamster: undefined } : tank
      );
    });
    const hamsterPrice = hamster.hamster;
    setCoins(
      (prev) =>
        prev +
        (isAdult
          ? adultHamsterBaseSellPrice + hamsterPrice!
          : babyHamsterSellPrice)
    );
  };

  const buyAquarium = () => {
    setAquariums((prev) => [
      ...prev,
      {
        hamster: undefined,
        fed: 5,
        id: uuid(),
        adult: true,
        createdAt: 0,
      },
    ]);
    setCoins((prev) => prev - aquariumPrice);
  };

  const buyHamster = () => {
    setAquariums((prev) => {
      const freeAquariumId = prev.filter((aq) => aq.hamster === undefined)[0]
        .id;
      return prev.map((tank) =>
        tank.id === freeAquariumId
          ? {
              ...tank,
              hamster: Math.floor(Math.random() * 5),
              adult: true,
              createdAt: Date.now() - baseAdultHamsterAge,
              fed: 5,
            }
          : tank
      );
    });
    setCoins((prev) => prev - adultHamsterBuyPrice);
  };

  const reproduce = () => {
    setAquariums((prev) => {
      const pictureIds = prev
        .filter(
          (el) => el !== undefined && Date.now() - el.createdAt > timeTillAdult
        )
        .map((aq) => aq.hamster);

      const randomPictureId = Math.floor(Math.random() * pictureIds.length);
      const freeAquariumId = prev.filter((aq) => aq.hamster === undefined)[0]
        .id;
      return prev.map((tank) =>
        tank.id === freeAquariumId
          ? {
              ...tank,
              hamster: pictureIds[randomPictureId],
              adult: false,
              createdAt: Date.now(),
              fed: 5,
            }
          : tank
      );
    });
    setCoins((prev) => prev - reproducePrice);
  };

  const getHamsterHungry = (id: string) => {
    setAquariums((prev) => {
      const hamsterFed = prev.filter((aq) => aq.id === id)[0].fed;
      const newFedValue = hamsterFed - 1 < 0 ? 0 : hamsterFed - 1;

      return prev.map((tank) =>
        tank.id === id ? { ...tank, fed: newFedValue } : tank
      );
    });
  };

  useEffect(() => {
    const downloadCoins = localStorage.getItem("coins");
    const downloadAqua = localStorage.getItem("aquariums");
    downloadCoins && setCoins(parseInt(downloadCoins));
    downloadAqua && setAquariums(JSON.parse(downloadAqua));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem("aquariums", JSON.stringify(aquariums));
      localStorage.setItem("coins", coins.toString());
    }, 0);
  }, [aquariums, coins]);

  return (
    <HamsterContext.Provider
      value={{
        coins,
        aquariums,
        feedHamster,
        sellHamster,
        buyAquarium,
        buyHamster,
        reproduce,
        getHamsterHungry,
      }}
    >
      {children}
    </HamsterContext.Provider>
  );
};
