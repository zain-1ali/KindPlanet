import { allSocialLinksType, isUserLoginType, logoutUser, updateLanguageType, updateLinks, updateUserProfileType, userLoginInfoType } from "./actions-types";


const initialState = {
    loginUserInfo: {}
  };
  
export const loginReducer = (state = initialState, action) => {
    switch(action.type){
        case isUserLoginType: {
            return {
                ...state,
                isUserLoginSuccess: action.payload.loginUserData
            }
        }
        case userLoginInfoType: {
            return {
                ...state,
                userLoginInfo: action.payload.loginUserInfo
            }
        }
        case updateUserProfileType: {
            return {
                ...state,
                updatedUser: action.payload.updatedUserProfile
            }
        }
        case allSocialLinksType: {
            return {
                ...state,
                socialLinks: action.payload.socialLinks
            }
        }
        case updateLinks: {
            return {
                ...state,
                updatedLinks: action.payload.updatedValue
            }
        }
        case logoutUser: {
            return {
                ...state,
                setEmptyUser: null
            }
        }
        case updateLanguageType: {
            return {
                ...state, 
                updateSelectedLng: action.payload.updatedLanguage
            }
        }
        default:
        return state;
    }
}