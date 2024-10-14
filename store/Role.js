 
import { defineStore } from 'pinia';

export const useUserRoleStore = defineStore('userRole', {
  state: () => ({
    role: null,  
  }),
  actions: {
    setRole(role) {
      this.role = role;  
    },
    clearRole() {
      this.role = null;  
    },
  },
});
