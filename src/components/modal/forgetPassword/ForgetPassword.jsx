import { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { CLOSE_ICON } from '../../../assets/images';
import { hideCustomModal, sendOtpAction } from '../../../store/sagaActions';
import { forgotPasswordValidatior } from '../../../validations/forgot_password';
import CustomModal from '../CustomModal';
import VerifyOtp from '../verifyOtp/VerifyOtp';
import { FORGET_PASSWORD_MODAL } from '../../../constants/modalTypeConstant';

import styles from './forgetPassword.module.scss';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);
  const [detail, setDetail] = useState('');

  const initialValues = {
    userData: ''
  };

  const { customModalType } = useSelector((state) => state.modal);
  const hideModal = () => dispatch(hideCustomModal());

  const data = {
    purpose: 'FORGOT_PASSWORD',
    via: 'code'
  };

  const isValidMobile = (value) => {
    const mobileRegex = /^\d+$/;
    return mobileRegex.test(value);
  };

  const sendCodeHandler = (details) => {
    const userData = isMobile
      ? {
          phone: details,
          ...data
        }
      : {
          email: details,
          ...data
        };
    dispatch(sendOtpAction({ data: userData }));
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
          <div className={styles.modal_title}>Forgot Password</div>
          <div className={`${styles.modal_desc} heading2`}>
            Enter your registered email / phone number below to receive the password link
          </div>
          <div className={styles.email_input}>
            <Formik
              initialValues={initialValues}
              validationSchema={() => forgotPasswordValidatior({ mobile: isMobile })}
              onSubmit={(values) => {
                sendCodeHandler(values.userData);
                // handleSubmitData(values, resetForm);
              }}>
              {({ isValid, errors, setFieldValue, values }) => (
                <Form>
                  <div className={styles.email_input}>
                    <div className={styles.input_name}> Email / Phone Number </div>
                    <Field
                      name="userData"
                      type="text"
                      className="input_box"
                      onChange={(e) => {
                        const inputValue = e.target.value.toLowerCase();
                        if (isValidMobile(e.target.value)) {
                          setIsMobile(true);
                        } else setIsMobile(false);
                        setFieldValue('userData', inputValue);
                        setDetail(inputValue);
                      }}
                    />
                    {errors.userData && (
                      <div className="error_msg">{errors.userData}</div>
                    )}
                  </div>
                  <Button
                    className={`${styles.send_btn} interact`}
                    type="submit"
                    disabled={!isValid || values.userData === ''}>
                    Send Code
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <CustomModal
        showModal={customModalType === FORGET_PASSWORD_MODAL}
        closeModal={hideModal}
        modalBody={modalBody()}
        className="forget_pwd_modal"
      />
      <VerifyOtp
        data={isMobile ? { phone: detail, ...data } : { email: detail, ...data }}
        mainHead={isMobile ? 'Verify Phone Number' : 'Verify Email Address'}
        subHead={
          isMobile
            ? 'Please enter the code sent to'
            : 'Please enter the code sent to your email address'
        }
        receiver={detail}
        isMobile={isMobile}
      />
    </>
  );
};

export default ForgotPassword;
