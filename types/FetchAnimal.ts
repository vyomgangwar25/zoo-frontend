export interface fetchAnimal {
  animaldata: {
    animal_id: BigInteger;
    dob: string;
    gender: string;
    name: string;
    zoo_id: BigInteger;
  }[],
  animalcount:number
}
