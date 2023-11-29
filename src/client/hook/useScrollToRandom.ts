import { RefObject, useRef } from "react";
import { FlatList } from "react-native";

type ReturnType = [RefObject<FlatList>, (length: number) => void];

function useScrollToRandom(): ReturnType {
  const flatList = useRef<FlatList>(null);

  async function scrollToRandom(length: number) {
    const offset = length;
    let index = offset + Math.floor(Math.random() * length);
    const finalIndex = index + Math.floor(Math.random() * 5) + 3;

    flatList.current?.scrollToIndex({ index, viewPosition: 0 });

    var intervalID = setInterval(() => {
      flatList.current?.scrollToIndex({ index, viewPosition: 0 });

      if (++index === finalIndex) {
        clearInterval(intervalID);
      }
    }, 500);
  }

  return [flatList, scrollToRandom];
}

export default useScrollToRandom;
