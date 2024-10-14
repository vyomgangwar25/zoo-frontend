 
const router = useRouter();
export const useAuth = () => { 
    const isLoggedIn = useState<boolean>('isLoggedIn', () => {
       
      return !!localStorage.getItem('token');
    });
  
    
    const login = (token: string): void => {
      localStorage.setItem('token', token);  
      isLoggedIn.value = true;  
    };
  
  
    const logout = (): void => {
        const cookie = useCookie("SavedToken");
        cookie.value = "";
        localStorage.removeItem("SavedToken");
        router.push("/login"); 
      isLoggedIn.value = false;  
    };
   
    return { isLoggedIn, login, logout };
  };
  