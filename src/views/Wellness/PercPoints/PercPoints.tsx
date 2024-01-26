import { images } from 'assets';
import { Loader } from 'components/general/Loader/Loader';
import { BodyText } from 'components/general/Typography';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectCurrentAuthState } from 'store/user/authentication.slice';
import { useLazyGetZogoPointsQuery } from 'store/user/zogo/zogo.api';
import { selectZogoData } from 'store/user/zogo/zogo.slice';
import { SPercPoints, SWrapper, SCoin } from './PercPoints.styles';

export const PercPoints: React.FC = () => {
  const { t } = useTranslation();
  const [getZogoPointsAPI, { isFetching, isSuccess }] = useLazyGetZogoPointsQuery();
  const { primaryPoints } = useSelector(selectZogoData);
  const { zogoUserId } = useSelector(selectCurrentAuthState);

  useEffect(() => {
    getZogoPointsAPI({ zogoUserId: zogoUserId ?? null });
  }, []);

  if (isSuccess)
    return (
      <SWrapper>
        <SPercPoints>
          {isFetching ? (
            <Loader noPadding />
          ) : (
            <>
              <SCoin src={images.coin} alt="coin" />
              <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="R" marginLeft={11.5} nowrap>
                {t('homeScreen.Tenx Points')}:
              </BodyText>
              <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="B" marginLeft={15} nowrap>
                {primaryPoints}
              </BodyText>
            </>
          )}
        </SPercPoints>
      </SWrapper>
    );

  return null;
};
