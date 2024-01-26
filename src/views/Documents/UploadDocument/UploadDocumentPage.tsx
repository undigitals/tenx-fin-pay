import { BodyText, Title } from 'components/general/Typography';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLazyGetDocumentRequestsQuery, useUploadRequestedDocumentsMutation } from 'store/user/users.api';
import { Loader } from 'components/general/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { handleError } from 'utils/helpers/errorHelper';
import { useToggle } from 'utils/hooks/useToggle';
import { FileItem } from './FileItem/FileItem';
import { UploadSheet } from './DocumentSheets/UploadSheet';
import { SLayout } from './UploadDocumentPage.styles';

interface IRequestedDocumentItem {
  id: string;
  description: string;
  name: string;
}

export interface IUploadedDocumentItem {
  file: File;
  index: number;
  documentTypeId: string;
}

export const UploadDocumentPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [getRequestDocumentsAPI, { isFetching, currentData, isSuccess, isError, error }] = useLazyGetDocumentRequestsQuery();
  const [uploadRequestedDocumentsAPI, uploadRequestedDocumentsAPIResult] = useUploadRequestedDocumentsMutation();

  const [requestedDocuments, setRequestedDocuments] = useState<IRequestedDocumentItem[]>([]);
  const [uploadedDocuments, setUploadedDocuments] = useState<IUploadedDocumentItem[]>([]);
  const [documentRequestId, setDocumentRequestId] = useState('');

  const uploadSheet = useToggle(false);

  // Which field selection is active
  const [selectedFieldIndex, setSelectedFieldIndex] = useState(0);

  // Upload handlers
  const handleUploadFieldClick = (index: number) => {
    setSelectedFieldIndex(index);
    uploadSheet.show();
  };

  const handleFileUploaded = (file: File) => {
    uploadSheet.hide();

    const uploadedFileItem = {
      file,
      index: selectedFieldIndex,
      documentTypeId: requestedDocuments[selectedFieldIndex]?.id,
    };

    setUploadedDocuments([...uploadedDocuments, uploadedFileItem]);
  };

  // Navigation handlers
  const handleUploadLater = () => {
    navigate(ROUTES.home.path);
  };

  const handleContinue = () => {
    uploadedDocuments.forEach((item: IUploadedDocumentItem) => {
      const fileData = new FormData();
      fileData.append('file', item.file);

      const requestBody = {
        fileData,
        documentRequestId,
        documentTypeId: item.documentTypeId,
      };

      uploadRequestedDocumentsAPI(requestBody);
    });
  };

  useEffect(() => {
    getRequestDocumentsAPI({});
  }, [getRequestDocumentsAPI]);

  useEffect(() => {
    if (isSuccess && currentData?.length) {
      setRequestedDocuments(currentData[0]?.requestType.requestedDocuments);
      setDocumentRequestId(currentData[0].id);
    }
    if (isError) handleError(error);
  }, [isError, isSuccess, currentData, error]);

  useEffect(() => {
    if (uploadRequestedDocumentsAPIResult.isSuccess) navigate(ROUTES.home.path);
    if (uploadRequestedDocumentsAPIResult.isError) handleError(uploadRequestedDocumentsAPIResult.error);
  }, [uploadRequestedDocumentsAPIResult, navigate]);

  if (isFetching || uploadRequestedDocumentsAPIResult.isLoading) return <Loader />;

  return (
    <SLayout>
      <div>
        <Title size="M" fontWeight="SB" marginBottom={32} marginTop={15} className="title">
          {t('documents.Title')}
        </Title>

        <BodyText textType="bodyText" font="Poppins" color="charcoal" fontWeight="M" size="L" marginBottom={8} lineHeight={1.4} className="subtitle">
          {t('documents.Subtitle')}
        </BodyText>

        <BodyText textType="bodyText" size="N" fontWeight="R" color="charcoal70" marginBottom={32} lineHeight={1.4}>
          {t('documents.Description')}
        </BodyText>

        {currentData?.length > 0 && (
          <CustomCard borderRadius={20} className="upload-card">
            {requestedDocuments.map((item, index) => (
              <FileItem title={item.description} uploadedDocuments={uploadedDocuments} uploadSelected={handleUploadFieldClick} index={index} key={item.id} />
            ))}
            <BodyText textType="bodyText" size="N" fontWeight="R" color="charcoal70" lineHeight={1.4}>
              {t('documents.Review')}
            </BodyText>
          </CustomCard>
        )}
      </div>

      <div className="footer">
        <CustomButton marginBottom={24} preset="primary" onClick={handleContinue} disabled={uploadedDocuments.length < requestedDocuments.length}>
          {t('documents.Continue')}
        </CustomButton>

        <BodyText textType="bodyText" font="Poppins" size="N" fontWeight="M" justifyContent="center" color="blue" marginBottom={24} cursorPointer onClick={handleUploadLater}>
          {t('documents.UploadLater')}
        </BodyText>

        <BodyText textType="bodyText" size="T" fontWeight="R" color="charcoal50" justifyContent="center" textAlign="center">
          {t('documents.TenxDesc')}
        </BodyText>

        <UploadSheet fileUploaded={handleFileUploaded} show={uploadSheet.isActive} onClose={uploadSheet.hide} />
      </div>
    </SLayout>
  );
};
