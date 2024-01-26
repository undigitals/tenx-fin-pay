import { Rule } from 'antd/lib/form';
import i18next from 'i18next';
import { validatePhoneLength } from 'utils/helpers/phoneNumber';
import { isAfter, isValid } from 'date-fns';
import { parseDate } from './date';

// /\S{1}/ tests for at least a single non whitespace character.
export const getRequiredRule = (message: string, spaceRules?: boolean): Rule => ({
  required: true,
  message: i18next.t(message),
  pattern: spaceRules === true ? /^\S+$|(^\S.+\S+$)/ : /\S{1}/,
});

export const maxLengthRule: Rule = {
  max: 30,
  message: i18next.t('myInfo.Maximum30Characters'),
};

export const passwordRules: Rule[] = [
  {
    min: 8,
    message: 'Minimum 8 characters',
  },
  {
    type: 'string',
    pattern: /^(?=.*[A-Z]).+$/,
    message: 'At least 1 capital letter (A-Z)',
  },
  {
    type: 'string',
    pattern: /(?=.*\d)/,
    message: 'At least 1 number (0-9)',
  },
  {
    type: 'string',
    pattern: /(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])/,
    message: 'At least 1 special character (!$%@&#?+-_)',
  },
];

export const getEmailRulesOptional = (): Rule => ({
  type: 'email',
  message: i18next.t('profile.Please give a valid email'),
});

export const getEmailRules = (): Rule[] => [
  {
    required: true,
    message: i18next.t('profile.Please input your email address'),
  },

  getEmailRulesOptional(),
];

export const addressCityRules = (): Rule[] => [
  {
    type: 'string',
    required: true,
    message: i18next.t('profile.Please input city'),
  },
  {
    type: 'string',
    pattern: /^[a-zA-Z\s]*$/,
    message: i18next.t('profile.Please use only letters in city field'),
  },
];

export const retypePasswordRules = (matchField: string): Rule[] => [
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue(matchField) === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('Passwords must match'));
    },
  }),
];

export const getPhoneValidator = (errorMessage: string, minLength = 11): Rule => ({
  validator: async (_, value) => {
    if (value !== undefined)
      if (!validatePhoneLength(value, minLength)) {
        throw new Error(i18next.t(errorMessage));
      }
  },
});

export const noSideWhitespacesRule = (): Rule => ({
  type: 'string',
  pattern: /^\S+$|(^\S.+\S+$)/,
  message: i18next.t('preRegOnboarding.No whitespaces in the beginning or in the end'),
});

export const noSpecialCharactersRule = (): Rule => ({
  type: 'string',
  pattern: /^[a-zA-Z ]*$/,
  message: i18next.t('preRegOnboarding.OnlyLetters'),
});

export const ageDateRule: Rule = {
  transform: (value: string | Date) => value && (typeof value === 'string' ? parseDate(value) : value),
  validator: async (_, value) => {
    if (value && !isValid(value)) {
      return Promise.reject(new Error(i18next.t('preRegOnboarding.Incomplete or wrong date')));
    }
    if (value && isAfter(value, new Date())) {
      return Promise.reject(new Error(i18next.t('preRegOnboarding.This date is in future')));
    }
    return Promise.resolve();
  },
};

export const ageDateStringRules = (): Rule[] => [
  {
    type: 'string',
    required: true,
    validator: async (_, value) => {
      if (!value) {
        return Promise.reject(new Error(i18next.t('preRegOnboarding.Please input date')));
      }
      return Promise.resolve();
    },
  },
  {
    type: 'string',
    pattern: /^\d{2}\/\d{2}\/\d{4}$/,
    message: i18next.t('preRegOnboarding.Date should be in MM/DD/YYYY format'),
  },
  ageDateRule,
];
