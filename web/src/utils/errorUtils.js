import CONSTANTS from '../constants';

const { ERRORS } = CONSTANTS;
export const getErrorMsg = (error) => {
  const { response } = error.request;
  const errorObj = JSON.parse(response);
  const msg = ERRORS[errorObj.code].ko || ERRORS['401'].ko;
  return msg;
}