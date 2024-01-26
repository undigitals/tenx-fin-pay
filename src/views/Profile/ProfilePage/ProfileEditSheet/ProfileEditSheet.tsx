import React from 'react';
import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';
import { ProfileChangePasswordPage } from 'views/Profile/ChangePassword/ProfileChangePasswordPage';
import { EditLegalName } from './EditLegalName';
import { EditName } from './EditName';
import { EditAddress } from './EditAddress';
import { EditMailingAddress } from './EditMailingAddress';
import { EditEmail } from './EditEmail/EditEmail';
import { EditUsername } from './EditUsername';
import { EditPhoneNumber } from './EditPhoneNumber/EditPhoneNumber';

interface IProps {
  closeSheet?: () => void;
}

const sheetContentMap: { [key: string]: (props: IProps) => JSX.Element } = {
  legalName: EditLegalName,
  preferredName: EditName,
  username: EditUsername,
  address: EditAddress,
  mailingAddress: EditMailingAddress,
  phoneNumber: EditPhoneNumber,
  email: EditEmail,
  password: ProfileChangePasswordPage,
};

interface ISheetProps {
  isOpen: boolean;
  type: string;
  closeSheet: () => void;
}

export const ProfileEditSheet: React.FC<ISheetProps> = ({ isOpen, type, closeSheet }) => {
  const handleOnCancel = () => {
    closeSheet();
  };

  const ContentComponent = type !== undefined ? sheetContentMap[type] : null;

  return (
    <CustomSheet height="fit-content" isOpen={isOpen} header={false} wrapperPadding={false} paddingTop="32px" padding="18px" onClose={handleOnCancel} className={type}>
      {ContentComponent && <ContentComponent closeSheet={closeSheet} />}
    </CustomSheet>
  );
};
