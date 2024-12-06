
export interface AnimalHistory{
    animalData:{
        name : string | null,
        dob: string | null,
        gender : string | null
    },
    transferHistoryList:{ 
        fromzoo: string; 
        tooZoo: string;
        animalName: string;
        userName: string
    }[]

}