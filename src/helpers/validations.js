export const required = value => (value === "" || value === 0 ? true : false);
export const requiredNotZero = value => (value <= 0 ? true : false);
export const email = value =>
    value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? true : false;

export const isRequired = value => (value === "" ? "invalid" : "valid");
export const isRequiredNotZero = value => (value <= 0 ? "invalid" : "valid");
export const isEmail = value =>
    value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? "valid" : "invalid";

export const convToDate = value =>
    new Date(Date.UTC(value.getFullYear(), value.getMonth(), value.getDate()));

export const isEqual = (fValue, sValue) =>
    fValue !== sValue || fValue === "" ? "invalid" : "valid";

export const intervLengthStr = (value, min, max) =>
    value.length >= min && value.length <= max;

export const isIntervLengthStr = (value, min, max) =>
    value.length >= min && value.length <= max ? "valid" : "invalid";
