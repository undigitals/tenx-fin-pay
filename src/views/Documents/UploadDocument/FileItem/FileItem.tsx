import React, { useMemo } from 'react';
import { BodyText } from 'components/general/Typography';
import { useTranslation } from 'react-i18next';
import { Icon } from 'components/general/Icon/Icon';
import { IUploadedDocumentItem } from 'views/Documents/UploadDocument/UploadDocumentPage';
import { SFileItemContainer } from './FileItem.styles';

interface IFileItem {
  title: string;
  index: number;
  uploadedDocuments: IUploadedDocumentItem[];
  uploadSelected: (index: number) => void;
}

export const FileItem: React.FC<IFileItem> = ({ title, uploadSelected, uploadedDocuments, index }) => {
  const { t } = useTranslation();
  const uploadedFile = useMemo(() => uploadedDocuments.find((item: IUploadedDocumentItem) => item.index === index), [uploadedDocuments, index]);

  const handleUploadSelect = () => {
    uploadSelected(index);
  };

  return (
    <>
      <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="B" marginBottom={16} marginTop={index === 0 ? 0 : 32}>
        {title}
      </BodyText>

      <SFileItemContainer onClick={handleUploadSelect}>
        <BodyText textType="bodyText" fontWeight="R" size="M" cursorPointer color={uploadedFile ? 'charcoal' : 'charcoal40'}>
          {uploadedFile?.file.name || t('documents.UploadFile')}
        </BodyText>
        <Icon name="circlePlus" size="smaller" color="charcoal" cursorPointer />
      </SFileItemContainer>
    </>
  );
};
