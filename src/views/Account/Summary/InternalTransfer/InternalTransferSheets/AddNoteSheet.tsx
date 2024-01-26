import React, { useEffect, useState } from 'react';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { Icon } from 'components/general/Icon/Icon';
import { Title } from 'components/general/Typography';
import { useTranslation } from 'react-i18next';
import { BaseInput } from 'components/general/BaseInput/BaseInput';

interface IAddNoteSheet {
  isOpen: boolean;
  note: string;
  onClose: () => void;
  onNoteChange: (note: string) => void;
}

export const AddNoteSheet: React.FC<IAddNoteSheet> = ({ isOpen, note, onClose, onNoteChange }) => {
  const { t } = useTranslation();
  const [noteInput, setNoteInput] = useState(note);

  useEffect(() => {
    setNoteInput(note);
  }, [note]);

  const handleNoteInputChange = (value: string) => {
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

      <BaseInput value={noteInput} placeholder={t('internalTransfer.Write your note here')} onChange={(event) => handleNoteInputChange(event.target.value)} containerStyle={{ height: '84px' }} />

      <CustomButton preset="primary" size="middleStretch" onClick={() => onNoteChange(noteInput)} marginTop={24} disabled={noteInput === ''}>
        {t('internalTransfer.Save Note')}
      </CustomButton>
    </CustomSheet>
  );
};
