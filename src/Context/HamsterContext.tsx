import { createContext, Dispatch, SetStateAction } from "react";
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

export interface IAquarium {
  [key: string]: number | boolean | string | undefined;
  hamster: number | undefined;
  fed: number;
  id: string;
  adult: boolean;
}

export const HamsterContext = createContext<{
  coins: number;
  aquariums: IAquarium[];
  feedHamster: (id: string) => void;
  sellHamster: (id: string) => void;
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
});

export const HamsterProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [coins, setCoins] = useState<number>(5000);

  const [aquariums, setAquariums] = useState<IAquarium[]>([
    { hamster: 4, fed: 5, id: "0", adult: true },
    { hamster: 3, fed: 5, id: "1", adult: true },
  ]);

  const feedHamster = (id: string) => {
    setAquariums((prev) =>
      prev.map((tank) =>
        tank.id === id ? { ...tank, fed: tank.fed + 1 } : tank
      )
    );
    setCoins((prev) => prev - 5);
  };

  const sellHamster = (id: string) => {
    setAquariums((prev) =>
      prev.map((tank) =>
        tank.id === id ? { ...tank, hamster: undefined } : tank
      )
    );
    setCoins((prev) => prev + 5);
  };

  const buyAquarium = () => {
    setAquariums((prev) => [
      ...prev,
      {
        hamster: undefined,
        fed: 5,
        id: uuid(),
        imageId: Math.floor(Math.random() * 5),
        adult: true,
      },
    ]);
    setCoins((prev) => prev - 30);
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
            }
          : tank
      );
    });
    setCoins((prev) => prev - 10);
  };

  const reproduce = () => {
    setAquariums((prev) => {
      const pictureIds = prev
        .map((aq) => aq.hamster)
        .filter((el) => el != undefined);

      const randomPictureId = Math.floor(Math.random() * pictureIds.length);
      console.log(pictureIds[randomPictureId]);
      const freeAquariumId = prev.filter((aq) => aq.hamster === undefined)[0]
        .id;
      return prev.map((tank) =>
        tank.id === freeAquariumId
          ? {
              ...tank,
              hamster: pictureIds[randomPictureId],
              adult: false,
            }
          : tank
      );
    });
    setCoins((prev) => prev - 3);
  };

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
      }}
    >
      {children}
    </HamsterContext.Provider>
  );
};
