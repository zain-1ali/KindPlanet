export const userLoginObjectSelector = (state) => state.loginUserReducer.isUserLoginSuccess

export const loginUserInfoSelector = (state) => state?.loginUserReducer?.userLoginInfo

export const updateUserProfileSelector = (state) => state?.loginUserReducer?.updatedUser

export const allSocialLinksSelector = (state) => state?.loginUserReducer?.socialLinks

export const updatedSocialLinksSelector = (state) => state.loginUserReducer.updatedLinks

export const updateSelectedLngSelector = (state) => state?.loginUserReducer?.updateSelectedLng