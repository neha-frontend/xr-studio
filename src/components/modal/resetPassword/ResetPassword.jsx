import { Formik, Field, Form } from 'formik';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { CLOSE_ICON, HIDE_PWD, SHOW_PWD } from '../../../assets/images';
import { FORGET_PASSWORD_MODAL, RESET_PASSWORD_MODAL } from '../../../constants/modalTypeConstant';
import { hideCustomModal, resetPasswordAction, showCustomModal } from '../../../store/sagaActions';
import { resetPasswordValidatior } from '../../../validations/forgot_password';
import CustomModal from '../CustomModal';

import styles from './resetPassword.module.scss';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { codeVerification } = useSelector((state) => state.auth.otp);
  const { customModalType } = useSelector((state) => state.modal);
  const hideModal = () => dispatch(hideCustomModal());
  const initialValues = {
    password: ''
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showError, setShowError] = useState({
    password: false,
    confirmPassword: false
  });

  // session timeout
  const timeout = () => {
    dispatch(
      showCustomModal({
        customModalType: FORGET_PASSWORD_MODAL
      })
    );
  };

  const resetPasswordHandle = (value) => {
    const data = {
      _codeVerification: codeVerification,
      password: value.password
    };
    dispatch(resetPasswordAction({ data, hideModal, timeout }));
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
          <Formik
            initialValues={initialValues}
            validationSchema={resetPasswordValidatior}
            onSubmit={(values) => resetPasswordHandle(values)}>
            {({ errors, isValid, setFieldValue }) => (
              <Form>
                <div className={styles.email_input}>
                  <div className={styles.input_name}>New Password</div>
                  {/* <input type="text" className="input_box" /> */}
                  <div className='position-relative reset_password_input_container'>
                  <Field
                    name="password"
                    type={`${showPassword ? 'text' : 'password'}`}
                    className={styles.input_box}
                    onChange={(e) => {
                      setFieldValue('password', e.target.value);
                      setShowError((prevState) => ({
                        ...prevState,
                        password: true
                      }));
                    }}
                  />
                  <img
                    src={showPassword ? SHOW_PWD : HIDE_PWD}
                    alt="check_icon"
                    className={`cp ${showPassword ? styles.eye_icon : styles.eye_off}`}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                  </div>
                  {errors.password && showError.password && (
                    <div className="error_msg">{errors.password}</div>
                  )}
                </div>
                <div className={styles.email_input}>
                  <div className={styles.input_name}>Confirm New Password</div>
                  {/* <input type="text" className="input_box" /> */}
                  <div className='position-relative reset_password_input_container'>
                  <Field
                    name="confirmPassword"
                    type={`${showConfirmPassword ? 'text' : 'password'}`}
                    className={styles.input_box}
                    onChange={(e) => {
                      setFieldValue('confirmPassword', e.target.value);
                      setShowError((prevState) => ({
                        ...prevState,
                        confirmPassword: true
                      }));
                    }}
                  />
                  <img
                    src={showConfirmPassword ? SHOW_PWD : HIDE_PWD}
                    alt="check_icon"
                    className={`cp ${showPassword ? styles.eye_icon : styles.eye_off}`}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                  </div>
                  {errors.confirmPassword && showError.confirmPassword && (
                    <div className="error_msg">{errors.confirmPassword}</div>
                  )}
                </div>
                <Button className={`${styles.send_btn} interact`} type="submit" disabled={!isValid}>
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </>
    );
  };

  return (
    <CustomModal
      showModal={customModalType === RESET_PASSWORD_MODAL}
      closeModal={hideModal}
      modalBody={modalBody()}
      className="reset_pwd_modal"
    />
  );
};

export default ResetPassword;
