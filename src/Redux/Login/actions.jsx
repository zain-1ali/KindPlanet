import { allSocialLinksType, isUserLoginType, updateLinks, updateUserProfileType, userLoginInfoType, logoutUser, updateLanguageType } from "./actions-types";

export const isUserLogin = (loginUserData) => ({
    type: isUserLoginType,
    payload: {
        loginUserData
    },
  });


export const loginUserObj = (loginUserInfo) => ({
    type: userLoginInfoType,
    payload: {
        loginUserInfo
    }
})

export const updateUserProfile = (updatedUserProfile) => ({
    type: updateUserProfileType,
    payload: {
        updatedUserProfile
    }
})

export const allSocialLinks = (socialLinks) => ({
    type: allSocialLinksType,
    payload: {
        socialLinks
    }
})

export const updateSocialLinks = (updatedValue) => ({
    type: updateLinks,
    payload: {
        updatedValue
    }
})

export const resetUser = () => ({
    type: logoutUser,
})

export const updateLanguage = (updatedLanguage) => ({
    type: updateLanguageType,
    payload:{
        updatedLanguage
    }
}) 