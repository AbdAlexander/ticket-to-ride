export const startGame = (newGameState) => ({
    type: 'START_GAME',
    payload: {
        newGameState
    },
});