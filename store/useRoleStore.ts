 
import { defineStore } from 'pinia';

export const useRoleStore = defineStore('role', {
  
    state: () => ({
         role:'',
         email:'',
         name:'',
         id:0,
         showDropDown:false
      }),
  
  
    actions: {
      setState(newRole: string,newEmail:string,newName:string,userId:number) {
        this.role = newRole; 
        this.email= newEmail;
        this.name=newName;
        this.id=userId;
      },
      toggleDropDown()
      {
        this.showDropDown=!this.showDropDown
      },
      
      closeDropDown()
       {
        this.showDropDown=false;
       }
       
    },
  });
