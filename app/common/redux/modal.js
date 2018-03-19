const constants = {
    OPEN: 'modal/OPEN',
    CLOSE: 'modal/CLOSE'
}

export const actions = {
    open: modalId => ({
        type: constants.OPEN,
        payload: { modalId }
    }),
    close: modalId => ({
        type: constants.CLOSE,
        payload: { modalId }
    })
}

export const selectors = {
    modalIsVisible: (state, modalId) => ~state.indexOf(modalId)
}

export default (state = [], { payload, type }) => {
    switch (type) {
        case constants.OPEN: {
            const { modalId } = payload
            const foundIndex = state.indexOf(modalId)

            if (~foundIndex) {
                console.log(`Modal ${modalId} is already opened`)
                return state
            } else {
                return [...state, modalId]
            }
        }

        case constants.CLOSE: {
            return state.filter(modalId => modalId !== payload.modalId)
        }

        default:
            return state
    }
}
