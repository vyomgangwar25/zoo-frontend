export interface fetchAnimal {
  animaldata: {
    animal_id: number;
    dob: string;
    gender: string;
    name: string;
    zoo_id: number;
  }[],
  animalcount:number
}
