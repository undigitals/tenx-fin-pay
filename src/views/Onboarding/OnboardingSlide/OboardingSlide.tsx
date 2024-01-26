import React, { ReactNode } from 'react';
import { Title, BodyText } from 'components/general/Typography';
import { SImageContainer, SContainer, STextContainer, SWrapper } from './OboardingSlide.styles';

interface IOnboardingSlideProps {
  img: string;
  title: string;
  description: string | ReactNode;
  subtitle?: string;
  boldText?: string;
  className?: string;
}

export const OnboardingSlide: React.FC<IOnboardingSlideProps> = ({ title, subtitle, boldText, description, img, className }) => (
  <SWrapper>
    <SContainer>
      <SImageContainer>
        <img src={img} alt={title} />
      </SImageContainer>
      <STextContainer>
        <div style={{ marginBottom: subtitle ? '50px' : '42px', marginTop: '18px' }} className={`${className}-header`}>
          <Title color="charcoal" size="M" fontWeight="M" font="Poppins" marginBottom={subtitle ? 5 : 0} className="title">
            {title}
          </Title>
          {subtitle && boldText && (
            <BodyText textType="bodyText" size="L" fontWeight="SB" font="Poppins" color="charcoal">
              {subtitle}
              <BodyText textType="bodyText" size="L" fontWeight="B" font="Poppins" color="charcoal" display="inline">
                {boldText}
              </BodyText>
            </BodyText>
          )}
        </div>
        <BodyText textType="bodyText" size="L" fontWeight="R" font="DM Sans" color="charcoal70" lineHeight={1.3}>
          {description}
        </BodyText>
      </STextContainer>
    </SContainer>
  </SWrapper>
);
