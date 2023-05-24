import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import OtpInput from 'react18-input-otp';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { CLOSE_ICON } from '../../../assets/images';
import { showCustomModal, hideCustomModal, verifyOtpAction } from '../../../store/sagaActions';
import { RESET_PASSWORD_MODAL, SHOW_OTP_MODAL } from '../../../constants/modalTypeConstant';
import ResetPassword from '../resetPassword/ResetPassword';
import CountdownTimer from '../../countdownTimer/CountdownTimer';
import CustomModal from '../CustomModal';
import { EMAIL_REGEX } from '../../../constants/regexConstants';

import styles from './verifyOtp.module.scss';

const VerifyOtp = ({ data, mainHead, subHead, receiver, isMobile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customModalType } = useSelector((state) => state.modal);
  const { otpId, purpose } = useSelector((state) => state.auth.otp);

  const hideModal = () => {
    dispatch(hideCustomModal());
    setOtp('');
  };

  const [otp, setOtp] = useState('');

  const handleOtpChange = (otpValue) => {
    setOtp(otpValue);
  };

  const maskMobileNo = (text) => {
    if (text !== '') {
      const length = text?.length;
      return length >= 2 ? '*'.repeat(length - 2) + text.slice(-2) : text;
    }
  };

  const maskEmail = (email) => {
    if (EMAIL_REGEX.test(email)) {
      const indexOfAt = email?.indexOf('@');
      const maskedEmail = email
        ? email[0] + '*'?.repeat(indexOfAt - 2) + email[indexOfAt - 1] + email?.slice(indexOfAt)
        : null;
      return maskedEmail;
    }
  };

  const redirect = () => {
    if (purpose === 'PRE_SIGNUP') {
      navigate('/sign-up');
      hideModal();
    } else {
      dispatch(
        showCustomModal({
          customModalType: RESET_PASSWORD_MODAL
        })
      );
    }
  };

  const toastMsg = (msg) => {
    toast(msg);
  };

  const handleVerifyOtp = () => {
    const data = {
      _codeVerification: otpId,
      code: otp
      // purpose: purpose   changes in API
    };
    dispatch(verifyOtpAction({ data, redirect, toastMsg }));
    setOtp('');
  };

  const modalBody = () => {
    return (
      <>
        <div className={styles.close_modal}>
          <img
            src={CLOSE_ICON}
            alt="close_icon"
            className={styles.close_icon}
            onClick={hideModal}
          />
        </div>
        <div className={styles.modal_body}>
          <div className={styles.modal_title}>{mainHead}</div>
          <div className={`${styles.modal_desc} heading2`}>
            {subHead} <br /> <b>{isMobile ? maskMobileNo(receiver) : maskEmail(receiver)}</b>
          </div>
          <div className={styles.email_input}>
            <OtpInput
              value={otp}
              onChange={handleOtpChange}
              numInputs={6}
              separator={false}
              inputStyle={styles.otp_input}
              isInputNum
            />
          </div>
          <CountdownTimer data={data} />
          <Button className={styles.send_btn} onClick={handleVerifyOtp} disabled={otp.length !== 6}>
            Submit
          </Button>
        </div>
      </>
    );
  };

  return (
    <>
      <CustomModal
        showModal={customModalType === SHOW_OTP_MODAL}
        closeModal={hideModal}
        modalBody={modalBody()}
        className="otp_verify_modal"
      />
      <ResetPassword />
    </>
  );
};

export default VerifyOtp;
