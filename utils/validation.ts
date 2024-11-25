function emailValidation(email: string) {
    if (!email) 
        return "Email is required."
    else if (!/\S+@\S+\.\S+/.test(email))
          return "Email is not valid.";
}

const Icons = {
    Color: {
        primary: '',
    },
    hver:{

    },
    
}