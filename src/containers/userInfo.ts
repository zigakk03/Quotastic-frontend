import { createGlobalState } from 'react-hooks-global-state'

const { setGlobalState, useGlobalState} = createGlobalState({
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    avatar: '',
});

export { useGlobalState, setGlobalState}