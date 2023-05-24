import * as Yup from 'yup';

import { EMAIL_REQUIRED, EMAIL_VALID, PASSWORD_REQUIRED, PHONE_REQUIRED, PHONE_VALID } from '../constants/errorConstants';
import { EMAIL_REGEX } from '../constants/regexConstants';

export const loginValidatior = ({ mobile }) => {  
  return Yup.object().shape({
    email: mobile
      ? Yup.string()
          .trim()
          .matches(/^\d{8,14}$/, PHONE_VALID)
          .required(PHONE_REQUIRED)
      : Yup.string().trim().matches(EMAIL_REGEX, EMAIL_VALID).required(EMAIL_REQUIRED),
    password: Yup.string().required(PASSWORD_REQUIRED)
  });
};
