// custom-style.js
const customStyles = {
    components: {
      Button: {
        variants: {
          orange: {
            bg: "#F75200",
            color: "white",
            height: "32px",
            borderRadius: "40px",
            px: 6,
            fontSize: "14px",
            fontFamily: `"Geomanist-medium", sans-serif`,
            fontWeight: 500,
            _hover: {
              bg: "#FF6215",
              _disabled: {
                bg: "#FFD8CA", // hover disabled state
              },
            },
            _focus: {
              bg: "#F75200",
            },
            _active: {
              bg: "#DE4A00",
            },
            _disabled: {
              bg: "#FFD8CA",
              cursor: "not-allowed",
              opacity: 1, // remove fade-out look if desired
            },
          },
          transparent: {
            bg: "white",
            border: "2px solid",
            borderColor: "#F75200",
            color: "#F75200",
            height: "46px",
            lineHeight: "normal",
            borderRadius: "60px",
            px: 5,
            fontSize: "14px",
            fontFamily: `"Geomanist-bold", sans-serif`,
            _hover: {
              textDecoration: "none",
              bg: "#FFEDE8",
              _disabled: {
                bg: "white",
              },
            },
            _focus: {
              bg: "#F75200",
              color: "white",
            },
            _active: {
              bg: "#DE4A00",
              color: "white",
            },
            _disabled: {
              bg: "white",
              cursor: "not-allowed",
              opacity: 0.6,
            },
          },
          plainBlue: {
            bg: "white",
            color: "#0070E0",
            height: "46px",
            px: 0,
            fontSize: "14px",
            fontFamily: `"Geomanist-medium", sans-serif`,
            fontWeight: 500,
            _hover: {
              textDecoration: "none",
              bg: "white",
              _disabled: {
                bg: "white",
              },
            },
            _focus: {
              bg: "white",
              color: "#0070E0",
            },
            _active: {
              bg: "white",
              color: "#0070E0",
            },
            _disabled: {
              bg: "white",
              cursor: "not-allowed",
              opacity: 0.6,
            },
          },
        },
      },
      Input: {
        variants: {
          customGray: {
            field: {
              width: "100%",
              height: "40px",
              borderRadius: "8px",
              border: "1px solid #CCCCCC",
              paddingTop: "15px",
              paddingBottom: "15px",
              paddingLeft: "16px",
              paddingRight: "16px",
              fontSize: "14px",
              color: "#696871",
              _placeholder: {
                color: "#A0A0A0",
              },
              _focus: {
                borderColor: "#CCCCCC",
                boxShadow: "none",
              },
            },
          },
        },
      },
      Container: {
        variants: {
            card: {
                w: { base: "100%", md: "527px" },
                py: { base: "23px", md: 8 },
                px: { base: 6, md: 8 },
                bg: "white",
                borderRadius: "12px",
                boxShadow: "base",
                mt: { base: "0", md: "48px" },
            },
            full: {
              maxWidth: "100%",  // <-- not "maxW"
              ml: { base: "0", md: "250px" },
              p:  { base: "24px", md: "48px" },
              mr: 0,
            }
        },
      },
      Table: {
        variants: {
          tableInfo: {
            table: {
              width: "100%",
            },
            tr: {
              _last: {
                borderBottom: "none",
              },
            },
            td: {
              px: 0,
              py: 0.5,
              fontSize: "14px",
              color: "gray.600",
              verticalAlign: "top",
              _last: {
                textAlign: "right",
              },
            },
          },
        },
      },
      Checkbox: {
        parts: ["control", "icon"],
        baseStyle: {
          control: {
            borderRadius: "4px",
            border: "2px solid #C0C0C0",
            bg: "white",
            _checked: {
              bg: "#0070E0",
              borderColor: "#0070E0",
              color: "white",
            },
          },
          icon: {
            fontSize: "14px",
            color: "white",
          },
        },
        variants: {
          blueRounded: {
            control: {
              width: "20px",
              height: "20px",
              borderRadius: "4px",
              border: "2px solid #C0C0C0",
              bg: "white",
              _checked: {
                bg: "#0070E0",
                borderColor: "#0070E0",
                color: "white",
              },
            },
            icon: {
              fontSize: "14px",
              color: "white",
            },
          },
        },
      },
    },
  };
  
  export default customStyles;
  