import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import ForgotPassword from '../../components/modal/forgetPassword/ForgetPassword';
import { loginAction, showCustomModal } from '../../store/sagaActions';
import SignUpOptions from '../createAccount/SignInOptions';
import { loginValidatior } from '../../validations/loginValidatior';
import { HIDE_PWD, SHOW_PWD } from '../../assets/images';
import { FORGET_PASSWORD_MODAL } from '../../constants/modalTypeConstant';
import BackDrop from '../../components/spinner/BackDrop';

import './../createAccount/createAccount.scss';
import './login.scss';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state) => state.auth.login);
  const { isLoading: otpLoader } = useSelector((state) => state.auth.otp);
  const { isLoading: resetLoader } = useSelector((state) => state.auth.forgotPassword);

  const [isMobile, setIsMobile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState({
    email: false,
    password: false
  });

  const initialValues = {
    email: '',
    password: '',
    grantType: 'password'
  };
  const isValidMobile = (value) => {
    const mobileRegex = /^\d+$/;
    return mobileRegex.test(value);
  };
  const redirect = (link) => navigate(link);
  return (
    <main>
      <BackDrop open={isLoading || otpLoader || resetLoader} />
      <div className="create_body center_div">
        <div className="signup_title heading1">Login</div>
        <Formik
          initialValues={initialValues}
          validationSchema={() => loginValidatior({ mobile: isMobile })}
          onSubmit={(values) => {
            const data = {
              password: values.password,
              grantType: 'password'
            };
            const userData = isMobile
              ? {
                  phone: values.email,
                  ...data
                }
              : {
                  email: values.email,
                  ...data
                };
            dispatch(
              loginAction({
                data: userData,
                redirect
              })
            );
          }}>
          {({ values, errors, isValid, setFieldValue }) => (
            <Form>
              <div className="email_input">
                <div className="input_name">Email / Phone Number</div>
                <Field
                  name="email"
                  type="text"
                  className="input_box"
                  onChange={(e) => {
                    const inputValue = e.target.value.toLowerCase();
                    if (isValidMobile(inputValue)) {
                      setIsMobile(true);
                    } else setIsMobile(false);
                    setFieldValue('email', inputValue);
                    setShowError((prevState) => ({
                      ...prevState,
                      email: true
                    }));
                  }}
                />
                {errors.email && showError.email && <div className="error_msg">{errors.email}</div>}
              </div>

              <div className="email_input">
                <div className="password_input">Password </div>
                <Field
                  name="password"
                  type={`${showPassword ? 'text' : 'password'}`}
                  className="input_box"
                  onChange={(e) => {
                    setFieldValue('password',e.target.value)
                    setShowError((prevState) => ({
                      ...prevState,
                      password: true
                    }));
                  }}
                />
                <img
                  src={showPassword ? SHOW_PWD : HIDE_PWD}
                  alt="check_icon"
                  className={`cp ${showPassword ? 'eye_icon' : 'eye_off'}`}
                  onClick={() => setShowPassword(!showPassword)}
                />
                {errors.password && showError.password && (
                  <div className="error_msg">{errors.password}</div>
                )}
                <div
                  className="forget_pwd"
                  onClick={() =>
                    dispatch(
                      showCustomModal({
                        customModalType: FORGET_PASSWORD_MODAL
                      })
                    )
                  }>
                  Forgot Password?
                </div>
              </div>

              <Button
                className="start_btn heading2"
                type="submit"
                disabled={values.email === '' || !isValid}>
                Login
              </Button>
            </Form>
          )}
        </Formik>
        <div className="heading3 create_acc">
          Don’t have an account ?&nbsp;
          <Link to="/create-account" className="create_link">
            Create an Account
          </Link>
        </div>
        <SignUpOptions />
        <ForgotPassword />
      </div>
    </main>
  );
};

export default Login;
