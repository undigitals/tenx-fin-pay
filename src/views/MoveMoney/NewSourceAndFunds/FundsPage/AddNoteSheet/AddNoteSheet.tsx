import React, { useState } from 'react';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { Icon } from 'components/general/Icon/Icon';
import { Title } from 'components/general/Typography';
import { useTranslation } from 'react-i18next';
import { BaseInput } from 'components/general/BaseInput/BaseInput';

interface IAddNoteSheet {
  isOpen: boolean;
  onClose: () => void;
  handleNoteAdded: (note: string) => void;
}

export const AddNoteSheet: React.FC<IAddNoteSheet> = ({ isOpen, onClose, handleNoteAdded }) => {
  const { t } = useTranslation();
  const [noteInput, setNoteInput] = useState<string>('');

  const handleSaveNote = () => {
    handleNoteAdded(noteInput);
    onClose();
  };

  const handleNoteChange = (value: string) => {
    setNoteInput(value);
  };

  return (
    <CustomSheet isOpen={isOpen} header={false} height="auto" wrapperPadding={false} onClose={onClose}>
      <CustomRow justifyContent="flex-start" marginBottom={24}>
        <Icon name="arrowLeft" color="charcoal" cursorPointer onClick={onClose} />

        <Title font="Poppins" color="charcoal" marginLeft={15} fontWeight="SB" size="S">
          {t('internalTransfer.Add Note')}
        </Title>
      </CustomRow>

      <BaseInput
        placeholder={t('internalTransfer.Write your note here')}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleNoteChange(event.target.value)}
        containerStyle={{ height: '84px' }}
      />

      <CustomButton preset="primary" size="middleStretch" onClick={handleSaveNote} marginTop={24} disabled={noteInput === ''}>
        {t('internalTransfer.Save Note')}
      </CustomButton>
    </CustomSheet>
  );
};
