// theme.js

const theme = {
  colors: {
    brand: {
      orange: "#F75200",
      orangeHover: "#FF6215",
      orangeBrdHover: "#FFEDE8",
      orangeFocus: "#FFD8CA",
      orangePressed: "#DE4A00",
      orangeDisabled: "#FFD8CA",
      yellow:"#FFA800",
      lightGray: "#DCDCDC",
      lightestGray: "#F3F3F3",
      collapsedGray: "#F7F7F7",
      blue: "#0070E0",
      darkBlue: "#050044",
      lightBlue: "#6BC4E8",
      lightestBlue: "#DCF1FA",
      lightBlueSlider: "#B9DDFF",
      textGray: "#696871",
      'gray-200': "#B9B9B9",
      white: "#FFFFFF",
      borderGray: "#E2E8F0",
      linkGray: "#85BCF0",
      selectedBg: "#E9F4FF",
      extraLightBorder: "#EDEDED",
      benefitsBorder: "#EBEBEB",
      orangeDark: "#D64300",
      hoverOrangeBg: "#FFF5F2",
      redMaroon:"#EC3333"
    },
    alerts: {
      info: {
        bg: "#E9F4FF",
        text: "#0070E0",
        border: "#0070E0"
      },
      error: {
        bg: "#FFEBEE",
        text: "#CD2026",
        border: "#CD2026"
      },
      success: {
        bg: "#E6F4EA",
        text: "#2E7D32",
        border: "#2E7D32"
      }
    }
  },
  fontSizes: {
    heading: {
      base: "20px",  // applies on mobile (default)
      md: "24px"     // applies from 48em (768px) and up
    },
    mobileHeading: "20px",
    body: "16px",
    small: "14px",
    xsmall:"12px"
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
    text: `'Geomanist-medium', sans-serif`
  },
  Button: {
    orange: {
      height: "32px",
      borderRadius: "40px",
      px: "6",
      textColor: "#ffffff"  
    },
    transparent: {
      border:"2px solid #F75200",
      height: "46px",
      borderRadius: "60px",
      px: "5",
      textColor: "#F75200",
      bg:"#ffffff" 
    }
  }
};

export default theme;
