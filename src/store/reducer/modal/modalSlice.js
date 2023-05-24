import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  title: '',
  message: '',
  withButton: true,
  buttonText: '',
  notifyType: 1,
  autoClose: true,
  redirectURL: '',
  buttonClick: undefined,
  showPrimaryButton: true,
  showCloseButton: true,
  handleCloseModal: null,
  FooterComponent: '',
  customModalOpen: false,
  customModalType: '',
  tempCustomModalData: null,
  geolocationModalOpen: false
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, { payload }) => {
      state.message = payload.message;
      state.open = true;

      if (payload.title !== undefined || payload.title === true) {
        state.title = payload.title;
      }
      if (payload.withButton !== undefined || payload.withButton === true) {
        state.withButton = payload.withButton;
      }
      if (payload.buttonClick !== undefined || payload.buttonClick === true) {
        state.buttonClick = payload.buttonClick;
      }
      if (payload.buttonText !== undefined) {
        state.buttonText = payload.message;
      }
      if (payload.notifyType !== undefined) {
        state.notifyType = payload.notifyType;
      }
      if (payload.autoClose !== undefined) {
        state.autoClose = payload.autoClose;
      }
      if (payload.redirectURL !== undefined) {
        state.redirectURL = payload.redirectURL;
      }
      if (payload.showPrimaryButton !== undefined) {
        state.showPrimaryButton = payload.showPrimaryButton;
      }
      if (payload.showCloseButton !== undefined) {
        state.showCloseButton = payload.showCloseButton;
      }
      if (payload.handleClick !== undefined) {
        state.handleClick = payload.handleClick;
      }
      if (payload.FooterComponent !== undefined) {
        state.FooterComponent = payload.FooterComponent;
      }
    },
    hideModal: (state) => {
      state.open = false;
    },
    resetModal: (state) => {
      state.title = '';
      state.message = '';
      state.withButton = true;
      state.buttonText = '';
      state.notifyType = 1;
      state.autoClose = true;
      state.redirectURL = '';
      state.buttonClick = undefined;
      state.showPrimaryButton = true;
      state.showCloseButton = true;
      state.handleCloseModal = null;
      state.FooterComponent = '';
      state.geolocationModalOpen = false;
    },
    showCustomModal: (state, { payload }) => {
      state.customModalOpen = true;
      if (payload.customModalType) {
        state.customModalType = payload.customModalType;
      }
      if (payload.tempCustomModalData) {
        state.tempCustomModalData = payload.tempCustomModalData;
      }
       if (payload.redirectURL !== undefined) {
         state.redirectURL = payload.redirectURL;
       }
    },
    hideCustomModal: (state) => {
      state.customModalOpen = false;
      state.customModalType = '';
      state.tempCustomModalData = null;
    }
  }
});

// Action creators are generated for each case reducer function
export const { showModal, hideModal, showCustomModal, hideCustomModal, resetModal } =
  modalSlice.actions;

export const modalReducer = modalSlice.reducer;
