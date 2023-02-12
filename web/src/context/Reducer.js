export const reducer = (state, action) => {
    switch (action.type) {
  
      case "USER_LOGIN": {
        return { ...state, isLogin: true , user: action.payload }
      }
      case "ADMIN_LOGIN": {
        return { ...state, adminLogin: true , admin: action.payload }
      }
      case "USER_LOGOUT": {
        return { ...state, isLogin: false } // set this to null on purpose, do not change
      }

      case "CLICK_LOGOUT": {
        return { ...state, clickLoad: false } // set this to null on purpose, do not change
      }
      case "CLICK_LOGIN": {
        return { ...state, clickLoad: true } // set this to null on purpose, do not change
      }
      
      case "TOGGLE_THEME": {
        return { ...state, darkTheme: !state.darkTheme } // set this to null on purpose, do not change
      }
  
  
  
      default: {
        return state
      }
    }
  }