import React from 'react';
import { ProfileChangePasswordPageForm } from './ChangePasswordForm/ProfileChangePasswordForm';

interface IProps {
  closeSheet?: () => void;
}

export const ProfileChangePasswordPage = ({ closeSheet }: IProps) => <ProfileChangePasswordPageForm closeSheet={closeSheet} />;
