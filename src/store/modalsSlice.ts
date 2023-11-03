import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpenNewPostModal: false,
    isOpenNewConfirmModal: false,
};

const modalsSlice = createSlice({
    name: 'modals',
    initialState: initialState,
    reducers: {
        closeAllModals(state) {
            state.isOpenNewPostModal = false;
            state.isOpenNewConfirmModal = false;
        },
        openNewPostModal(state) {
            state.isOpenNewPostModal = true;
        },
        openNewConfirmModal(state) {
            state.isOpenNewConfirmModal = true;
        },
    },
});

// Экспорт экшенов для вызова диспетчера
export const { openNewPostModal, openNewConfirmModal, closeAllModals } =
    modalsSlice.actions;

export default modalsSlice.reducer;
