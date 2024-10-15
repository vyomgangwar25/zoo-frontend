 
import { defineStore } from 'pinia';

export const useRoleStore = defineStore('role', {
  
    state: () => ({
         role:'',
         email:'',
         name:''
      }),
  
  
    actions: {
      setState(newRole: string,newEmail:string,newName:string) {
        this.role = newRole; 
        this.email= newEmail;
        this.name=newName
      },
       
    },
  });
