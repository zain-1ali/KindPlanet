const NewReducer = (state, action) => {
    switch (action.type) {
        case 'PROFILE_URL': {
            return {
                profileurl: action.payload
            }
        }

        // default: state
    }
}

export default NewReducer;