const INITIAL_STATE = {
    workers: null,
}

export default (state = INITIAL_STATE, action) => {
    // every time getting workers from action and updating state

    if (action.type === 'SET_WORKERS') {
        state = { ...state, workers: action.payload }
        return {
            ...state, workers: action.payload
        }
    }
    return state
}

