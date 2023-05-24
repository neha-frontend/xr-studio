import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Field, Formik, Form } from 'formik';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import PhoneInput from 'react-phone-input-2';

import { EMAIL_EXIST_ERROR, PHONE_EXIST_ERROR } from '../../constants/errorConstants';
import { checkAvailability, sendOtpAction } from '../../store/sagaActions/auth/auth';
import { availabilityValidator } from '../../validations/availabilityValidator';
import { resetAvailabilityCheck } from '../../store/sagaActions';
import SignUpOptions from './SignInOptions';
import VerifyOtp from '../../components/modal/verifyOtp/VerifyOtp';
import Spinner from '../../components/spinner';
import { CHECK, CLEAR } from '../../assets/images';
import BackDrop from '../../components/spinner/BackDrop';

import './createAccount.scss';

const CreateAccount = () => {
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);
  const [timer, setTimer] = useState(null);
  const [phone, setPhone] = useState({
    countryCode: '',
    mobileNo: ''
  });
  const [email, setEmail] = useState('');

  const initialValues = {
    email: ''
  };

  const { availabilityLoader, availability } = useSelector((state) => state.auth.register);
  const { isLoading } = useSelector((state) => state.auth.otp);

  const checkEmail = (value) => {
    if (value !== '')
      dispatch(checkAvailability({ email: value, isEmail: !isMobile, isUsername: false }));
  };

  const data = {
    purpose: 'PRE_SIGNUP',
    via: 'code'
  };

  const handleMobileChange = (value, countryCode) => {
    const mobileNo = value?.slice(countryCode.toString().length);
    if (value !== '') {
      dispatch(
        checkAvailability({
          phone: mobileNo,
          countryCode: countryCode,
          isEmail: !isMobile,
          isUsername: false
        })
      );
    }
    setPhone({
      ...phone,
      countryCode: countryCode,
      mobileNo: mobileNo
    });
  };

  const sendCodeHandler = (value) => {
    const userData = isMobile
      ? {
          phone: value.mobileNo,
          countryCode: value.countryCode,
          ...data
        }
      : {
          email: value.email,
          ...data
        };
    dispatch(sendOtpAction({ data: userData }));
  };

  const handleReset = (available, reset) => {
    if (!available) reset();
  };

  return (
    <main>
      <BackDrop open={isLoading} />
      <div className="create_body center_div">
        <div className="sub_body">
          <div className="signup_title heading1">Create an Account</div>
          <Formik
            initialValues={initialValues}
            validationSchema={availabilityValidator}
            onSubmit={(values) => {
              sendCodeHandler(values);
            }}>
            {({ values, errors, isValid, setFieldValue, resetForm }) => (
              <Form>
                {isMobile ? (
                  <>
                    <div className="email_input">
                      <div className="input_name">Phone Number </div>

                      <PhoneInput
                        className="w-100"
                        country="us"
                        enableSearch
                        onChange={(value, country) => {
                          clearTimeout(timer);
                          setTimer(
                            setTimeout(() => {
                              handleMobileChange(value, country?.dialCode);
                            }, 2000)
                          );
                          dispatch(resetAvailabilityCheck());
                        }}
                        autoFormat={true}
                        countryCodeEditable
                        disableSearchIcon
                      />
                      {phone.mobileNo.length > 6 &&
                      (availabilityLoader || availability === null) ? (
                        <Spinner className="input_spinner" spinnerClassName="spinner_body" />
                      ) : phone.mobileNo.length > 6 ? (
                        <img
                          src={availability ? CHECK : CLEAR}
                          alt="check_icon"
                          className="input_spinner"
                        />
                      ) : null}
                      {!availability && availability !== null && phone.mobileNo.length > 6 && (
                        <div className="error_msg">{PHONE_EXIST_ERROR}</div>
                      )}
                    </div>
                    <Button
                      className="start_btn heading2"
                      type="submit"
                      disabled={!availability || phone.mobileNo.length <= 6}
                      onClick={() => sendCodeHandler(phone)}>
                      Send Code
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="email_input">
                      <div className="input_name"> Email </div>
                      <Field
                        name="email"
                        type="email"
                        className="input_box"
                        onChange={(e) => {
                          const inputValue = e.target.value.toLowerCase();
                          setFieldValue('email', inputValue);
                          clearTimeout(timer);
                          setTimer(
                            setTimeout(() => {
                              checkEmail(inputValue);
                            }, 2000)
                          );
                          setEmail(inputValue);
                          dispatch(resetAvailabilityCheck());
                        }}
                      />
                      {email !== '' && (availabilityLoader || availability === null) ? (
                        <Spinner className="input_spinner" spinnerClassName="spinner_body" />
                      ) : isValid && values.email !== '' ? (
                        <img
                          src={availability ? CHECK : CLEAR}
                          alt="check_icon"
                          className="input_spinner cp"
                          onClick={() => handleReset(availability, resetForm)}
                        />
                      ) : null}
                      {availability === false && values.email !== '' && !errors.email && (
                        <div className="error_msg">{EMAIL_EXIST_ERROR}</div>
                      )}
                      {errors.email && (
                        <div className="error_msg">{errors.email}</div>
                      )}
                    </div>
                    <Button
                      className="start_btn heading2"
                      type="submit"
                      disabled={!isValid || !availability || values.email === ''}>
                      Send Code
                    </Button>
                  </>
                )}
              </Form>
            )}
          </Formik>
          <div className="create_btn heading2" onClick={() => setIsMobile(!isMobile)}>
            {isMobile ? 'Sign up with Email' : 'Sign up with Phone Number'}
          </div>
          <SignUpOptions />
        </div>
      </div>
      <div className="footer heading3">
        <span>Already have an account ? </span>
        <Link to="/login" className="footer_link">
          Log In
        </Link>
      </div>

      <VerifyOtp
        data={
          isMobile
            ? { phone: phone.mobileNo, countryCode: phone.countryCode, ...data }
            : { email: email, ...data }
        }
        mainHead={isMobile ? 'Verify Phone Number' : 'Verify Email Address'}
        subHead={
          isMobile
            ? 'Please enter the code sent to'
            : 'Please enter the code sent to your email address'
        }
        receiver={isMobile ? phone.mobileNo : email}
        isMobile={isMobile}
      />
    </main>
  );
};

export default CreateAccount;
