import { ControlProps, GroupBase, StylesConfig } from 'react-select';
import { DefaultTheme } from 'styled-components';
import { TFormStatus } from './BaseSelect.types';

const SBorder = (theme: DefaultTheme, status: TFormStatus, state: ControlProps<unknown, boolean, GroupBase<unknown>>) => {
  if (state.isFocused && status !== 'error') return `2px solid ${theme.blue}`;
  if (status === 'error') return `2px solid ${theme.red}`;
  return `2px solid ${theme.charcoal10}`;
};

export const customStyles = (theme: DefaultTheme, status: TFormStatus) => {
  const styles: StylesConfig = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      height: '56px',
      position: 'relative',
      width: '100%',
      borderRadius: '16px',
      padding: '0 10px',
      cursor: 'pointer',
      border: SBorder(theme, status, state),
      background: state.isDisabled ? theme.charcoal5 : theme.white,
      boxShadow: 'none',
      '&:hover': {
        borderColor: theme.blue,
      },
      fontSize: '16px',
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      boxShadow: 'none',
      position: 'relative',
      padding: 0,
      marginBottom: 0,
    }),
    menuList: (baseStyles) => ({
      ...baseStyles,
      paddingTop: 10,
      paddingBottom: 0,
      borderRadius: '16px',
      position: 'relative',
      width: '100%',
      color: theme.charcoal,
      cursor: 'pointer',
      boxShadow: 'none',
      '::-webkit-scrollbar': {
        display: 'none',
      },
      maxHeight: '60vh',
      overflowY: 'scroll',
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      width: '100%',
      position: 'relative',
      cursor: 'pointer',
      backgroundColor: theme.white,
      color: state.isSelected ? theme.blue : theme.charcoal,
      ':active': {
        backgroundColor: theme.white,
      },
      fontSize: '16px',
    }),
    placeholder: (baseStyles) => ({
      ...baseStyles,
      fontFamily: 'DM Sans',
      fontWeight: 400,
      fontSize: '16px',
      color: theme.charcoal40,
    }),
    dropdownIndicator: () => ({
      display: 'none',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    indicatorsContainer: () => ({
      display: 'flex',
      marginRight: '10px',
    }),
    menuPortal: () => ({
      position: 'initial',
    }),
  };

  return styles;
};
