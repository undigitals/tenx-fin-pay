import { Icon } from 'components/general/Icon/Icon';
import type { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface';
import { BodyText, Title } from 'components/general/Typography';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { UploadProps } from 'antd';
import { SActivityCard } from './DocumentSheets.styles';

interface IUploadSheet {
  show: boolean;
  onClose: () => void;
  fileUploaded: (file: File) => void;
}

export const UploadSheet: React.FC<IUploadSheet> = ({ show, onClose, fileUploaded }) => {
  const { t } = useTranslation();

  const uploadProps: UploadProps = {
    multiple: false,
    showUploadList: false,
    // FIXME: explicit type and remove antd upload feature
    customRequest: (options: RcCustomRequestOptions) => fileUploaded(options.file as File),
  };

  return (
    <CustomSheet isOpen={show} onClose={onClose} header={false} wrapperPadding={false} height="320px" className="upload-sheet">
      <Title marginBottom={10} fontWeight="SB" size="S">
        {t('documents.TakePhotoOrUpload')}
      </Title>

      <BodyText textType="bodyText" fontWeight="R" size="N" color="charcoal70" marginBottom={24} lineHeight={1.4}>
        {t('documents.SelectUploadType')}
      </BodyText>

      <CustomRow justifyContent="center" gap={16} marginBottom={24} flexWrap="wrap">
        <SActivityCard {...uploadProps}>
          <Icon name="uploadFile" color="charcoal" cursorPointer size="small" />
        </SActivityCard>
      </CustomRow>
    </CustomSheet>
  );
};
