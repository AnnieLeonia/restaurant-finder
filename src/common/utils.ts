export function calculateWalkingTime(distanceInMeters: number) {
  const walkingSpeed = 1.2;
  const walkingTimeInSeconds = distanceInMeters / walkingSpeed;
  return Math.ceil(walkingTimeInSeconds / 60);
}

export function toMap<T>(array: T[], key: keyof T) {
  return new Map(array.map(item => [item[key], item]));
}

export function uniqueArray<T>(arr: T[], fn: (item: T) => any) {
  return arr.filter((item, index) => {
    const value = fn(item);
    const firstIndex = arr.findIndex(obj => {
      return fn(obj) === value;
    });
    return index === firstIndex;
  });
}

export function shuffle<T>(_array: T[]) {
  const array = JSON.parse(JSON.stringify(_array)) as T[];
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export const generateUniqueKey = () =>
  `_${Math.random().toString(36).substring(2)}`;
