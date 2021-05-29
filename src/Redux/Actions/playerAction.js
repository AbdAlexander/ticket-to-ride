export const initPlayer = ({name}) => ({
    type: 'INIT_PLAYER',
    payload: {name:name}
});