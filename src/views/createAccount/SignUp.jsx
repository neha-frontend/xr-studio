import React, { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from '../../components/spinner';
import { checkAvailability, signUpAction } from '../../store/sagaActions/auth/auth';
import { signUpValidatior } from '../../validations/signUpValidator';
import { resetAvailabilityCheck } from '../../store/sagaActions';
import { USERNAME_EXIST_ERROR } from '../../constants/errorConstants';
import { CHECK, CLEAR, HIDE_PWD, SHOW_PWD } from '../../assets/images';
import BackDrop from '../../components/spinner/BackDrop';

import './createAccount.scss';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { codeVerification } = useSelector((state) => state.auth.otp);
  const { availabilityLoader, availability, isLoading } = useSelector(
    (state) => state.auth.register
  );

  const initialValues = {
    username: '',
    password: ''
  };

  const [timer, setTimer] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState({
    username: false,
    password: false
  });

  const redirect = (link) => navigate(link);

  // session timeout
  const timeout = () => navigate('/create-account');

  const handleUsernameChange = (value) => {
    if (value !== '') {
      dispatch(
        checkAvailability({
          isUsername: true,
          username: value
        })
      );
    }
  };

  const handleReset = (available, reset) => {
    if (!available) reset('username', '');
  };

  useEffect(() => {
    if (codeVerification === '') navigate('/');
  }, []);

  return (
    <main>
      <BackDrop open={isLoading} />
      <div className="create_body center_div">
        <div className="signup_title heading1">Create an Account</div>
        <Formik
          initialValues={initialValues}
          validationSchema={signUpValidatior}
          onSubmit={(values) => {
            dispatch(
              signUpAction({
                data: {
                  ...values,
                  _codeVerification: codeVerification,
                  accountType: 'USER'
                },
                redirect,
                timeout
              })
            );
          }}>
          {({ errors, isValid, values, setFieldValue }) => (
            <Form>
              <div className="email_input">
                <div className="input_name">Username </div>
                <Field
                  name="username"
                  type="text"
                  className="input_box"
                  onChange={(e) => {
                    const username = e.target.value.toLowerCase();
                    setFieldValue('username', username);
                    setShowError((prevState) => ({
                      ...prevState,
                      username: true
                    }));
                    clearTimeout(timer);
                    setTimer(
                      setTimeout(() => {
                        handleUsernameChange(username);
                      }, 2000)
                    );
                    dispatch(resetAvailabilityCheck());
                  }}
                />
                {values.username !== '' && (availabilityLoader || availability === null) ? (
                  <Spinner className="input_spinner" spinnerClassName="spinner_body" />
                ) : values.username !== '' ? (
                  <img
                    src={availability ? CHECK : CLEAR}
                    alt="check_icon"
                    className="input_spinner cp"
                    onClick={() => handleReset(availability, setFieldValue)}
                  />
                ) : null}
                {!availability && availability !== null && !errors.username && (
                  <div className="error_msg">{USERNAME_EXIST_ERROR}</div>
                )}
                {errors.username && showError.username && (
                  <div className="error_msg">{errors.username}</div>
                )}
              </div>

              <div className="email_input">
                <div className="password_input">Password </div>
                <Field
                  name="password"
                  type={`${showPassword ? 'text' : 'password'}`}
                  className="input_box"
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
                  className={`cp ${showPassword ? 'eye_icon' : 'eye_off'}`}
                  onClick={() => setShowPassword(!showPassword)}
                />
                {errors.password && showError.password && (
                  <div className="error_msg">{errors.password}</div>
                )}
              </div>

              <Button
                className="start_btn heading2"
                type="submit"
                disabled={values.username.length === 0 || !isValid || !availability}>
                Create an account
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="footer heading3">
        <span>Already have an account ? </span>
        <Link to="/login" className="footer_link">
          Log In
        </Link>
      </div>
    </main>
  );
};

export default SignUp;
