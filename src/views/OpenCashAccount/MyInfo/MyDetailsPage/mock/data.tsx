import i18next from 'i18next';

export const INCOME_SOURCE_DATA = () => [
  {
    id: 1,
    label: i18next.t('incomeSource.EmploymentIncomeSingle'),
    value: 'EmploymentIncomeSingle',
  },
  {
    id: 2,
    label: i18next.t('incomeSource.EmploymentIncomeMultiple'),
    value: 'EmploymentIncomeMultiple',
  },
  {
    id: 3,
    label: i18next.t('incomeSource.GovernmentBenefits'),
    value: 'GovernmentBenefits',
  },
  {
    id: 4,
    label: i18next.t('incomeSource.Retirement'),
    value: 'Retirement',
  },
  {
    id: 5,
    label: i18next.t('incomeSource.Other'),
    value: 'Other',
  },
];

export const ESTIMATED_ANNUAL_INCOME = () => [
  {
    id: 1,
    label: i18next.t('incomeSource.Less than $24,999'),
    name: 'Less than $24,999',
  },
  {
    id: 2,
    label: '$25,000 - $49,999',
    name: '$25,000 - $49,999',
  },
  {
    id: 3,
    label: '$50,000 - $74,999',
    name: '$50,000 - $74,999',
  },
  {
    id: 4,
    label: '$75,000 - $99,999',
    name: '$75,000 - $99,999',
  },
  {
    id: 5,
    label: i18next.t('incomeSource.More than $100,000'),
    name: 'More than $100,000',
  },
];

export const EMPLOYMENT_STATUS_DATA = () => [
  {
    id: 1,
    label: i18next.t('incomeSource.Full-time'),
    value: 'Full-time',
  },
  {
    id: 2,
    label: i18next.t('incomeSource.Part-time'),
    value: 'Part-time',
  },
  {
    id: 3,
    label: i18next.t('incomeSource.Seasonal'),
    value: 'Seasonal',
  },
  {
    id: 4,
    label: i18next.t('incomeSource.Self-employed'),
    value: 'Self-employed',
  },
  {
    id: 5,
    label: i18next.t('incomeSource.Student'),
    value: 'Student',
  },
  {
    id: 6,
    label: i18next.t('incomeSource.Retired'),
    value: 'Retired',
  },
  {
    id: 7,
    label: i18next.t('incomeSource.Unemployed (currently looking for work)'),
    value: 'Unemployed (currently looking for work)',
  },
  {
    id: 8,
    label: i18next.t('incomeSource.Unemployed (not currently looking for work)'),
    value: 'Unemployed (not currently looking for work)',
  },
];

export const MILITARY_STATUS_DATA = () => [
  {
    label: i18next.t('incomeSource.Active Duty'),
    value: 'Active Duty',
  },
  {
    label: i18next.t('incomeSource.Reserve'),
    value: 'Reserve',
  },
  {
    label: i18next.t('incomeSource.Veteran'),
    value: 'Veteran',
  },
  {
    label: i18next.t('incomeSource.Retired'),
    value: 'Retired',
  },
  {
    label: i18next.t('incomeSource.No Military Service'),
    value: 'No Military Service',
  },
];
