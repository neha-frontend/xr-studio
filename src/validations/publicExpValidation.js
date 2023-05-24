import * as Yup from 'yup';

import { REQUIRED_TEXT, EXPERIENCE_TAG_REQUIRED, CREATOR_TAG_REQUIRED } from '../constants/errorConstants';

export const publicExpValidation = Yup.object().shape({
  exp_name: Yup.string().required(REQUIRED_TEXT),
  image: Yup.string().required(REQUIRED_TEXT),
  description: Yup.string().required(REQUIRED_TEXT),
  tag_creators: Yup.array().min(1, CREATOR_TAG_REQUIRED).required(REQUIRED_TEXT),
  experience_tags: Yup.array().min(1, EXPERIENCE_TAG_REQUIRED).required(REQUIRED_TEXT),
});



