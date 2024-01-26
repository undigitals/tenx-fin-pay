import { createGlobalStyle } from 'styled-components';
import PoppinsBold from 'assets/fonts/Poppins-Bold.woff';
import PoppinsBold2 from 'assets/fonts/Poppins-Bold.woff2';
import PoppinsLight from 'assets/fonts/Poppins-Light.woff';
import PoppinsLight2 from 'assets/fonts/Poppins-Light.woff2';
import PoppinsSemiBold from 'assets/fonts/Poppins-SemiBold.woff';
import PoppinsSemiBold2 from 'assets/fonts/Poppins-SemiBold.woff2';
import PoppinsRegular from 'assets/fonts/Poppins-Regular.woff';
import PoppinsRegular2 from 'assets/fonts/Poppins-Regular.woff2';
import PoppinsMedium from 'assets/fonts/Poppins-Medium.woff';
import PoppinsMedium2 from 'assets/fonts/Poppins-Medium.woff2';
import DMSansRegular from 'assets/fonts/DM-Sans-Regular.woff';
import DMSansRegular2 from 'assets/fonts/DM-Sans-Regular.woff2';
import DMSansBold from 'assets/fonts/DM-Sans-Bold.woff';
import DMSansBold2 from 'assets/fonts/DM-Sans-Bold.woff2';
import DMSansMedium from 'assets/fonts/DM-Sans-Medium.woff';
import DMSansMedium2 from 'assets/fonts/DM-Sans-Medium.woff2';

export const Fonts = createGlobalStyle`
    @font-face {
        font-family: 'Poppins';
        src: url(${PoppinsBold2}) format('woff2'),
            url(${PoppinsBold}) format('woff');
        font-weight: bold;
        font-style: normal;
        font-display: swap;
        font-variant-settings: "liga" 0;
        font-variant-alternates: normal;
    }
    
    @font-face {
        font-family: 'Poppins';
        src: url(${PoppinsLight2}) format('woff2'),
            url(${PoppinsLight}) format('woff');
        font-weight: 300;
        font-style: normal;
        font-display: swap;
        font-variant-settings: "liga" 0;
        font-variant-alternates: normal;
    }
    
    @font-face {
        font-family: 'Poppins';
        src: url(${PoppinsSemiBold2}) format('woff2'),
            url(${PoppinsSemiBold}) format('woff');
        font-weight: 600;
        font-style: normal;
        font-display: swap;
        font-variant-settings: "liga" 0;
        font-variant-alternates: normal;
    }
    
    @font-face {
        font-family: 'Poppins';
        src: url(${PoppinsRegular2}) format('woff2'),
            url(${PoppinsRegular}) format('woff');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
        font-variant-settings: "liga" 0;
        font-variant-alternates: normal;
    }
    
    @font-face {
        font-family: 'Poppins';
        src: url(${PoppinsMedium2}) format('woff2'),
            url(${PoppinsMedium}) format('woff');
        font-weight: 500;
        font-style: normal;
        font-display: swap;
        font-variant-settings: "liga" 0;
        font-variant-alternates: normal;
    }

    @font-face {
      font-family: 'DM Sans';
      src: url(${DMSansRegular2}) format('woff2'),
          url(${DMSansRegular}) format('woff');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
      font-feature-settings: 'ss03' on, 'ss01' on, 'liga' off;
    }

    @font-face {
      font-family: 'DM Sans';
      src: url(${DMSansBold2}) format('woff2'),
          url(${DMSansBold}) format('woff');
      font-weight: bold;
      font-style: normal;
      font-display: swap;
      font-feature-settings: 'ss03' on, 'ss01' on, 'liga' off;
    }

    @font-face {
      font-family: 'DM Sans';
      src: url(${DMSansMedium2}) format('woff2'),
          url(${DMSansMedium}) format('woff');
      font-weight: 500;
      font-style: normal;
      font-display: swap;
      font-feature-settings: 'ss03' on, 'ss01' on, 'liga' off;
    }
`;
