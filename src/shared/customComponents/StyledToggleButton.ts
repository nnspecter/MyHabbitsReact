import { styled, toggleButtonClasses, ToggleButtonGroup, toggleButtonGroupClasses } from "@mui/material";

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  gap: '1rem',
  display: "flex",
  alignItems: "center",
  justifySelf: "center",
  flexWrap: 'wrap',
  [`& .${toggleButtonGroupClasses.firstButton}`]:
    {
      borderTopRightRadius: `calc(${(theme.vars || theme).shape.borderRadius}px * 2)`,
      borderBottomRightRadius: `calc(${(theme.vars || theme).shape.borderRadius}px * 2)`,
      borderTopLeftRadius: `calc(${(theme.vars || theme).shape.borderRadius}px * 2)`,
      borderBottomLeftRadius: `calc(${(theme.vars || theme).shape.borderRadius}px * 2)`,
    },
  [`& .${toggleButtonGroupClasses.middleButton}`]:
    {
      borderTopRightRadius: `calc(${(theme.vars || theme).shape.borderRadius}px * 2)`,
      borderBottomRightRadius: `calc(${(theme.vars || theme).shape.borderRadius}px * 2)`,
      borderTopLeftRadius: `calc(${(theme.vars || theme).shape.borderRadius}px * 2)`,
      borderBottomLeftRadius: `calc(${(theme.vars || theme).shape.borderRadius}px * 2)`,
      borderLeft: `1px solid ${(theme.vars || theme).palette.divider}`,
    },
  [`& .${toggleButtonGroupClasses.firstButton}, & .${toggleButtonGroupClasses.middleButton}, & .${toggleButtonGroupClasses.lastButton}`]: 
    {
      fontSize: '0.7rem',
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  [`& .${toggleButtonGroupClasses.lastButton}`]:
    {
      borderTopLeftRadius: `calc(${(theme.vars || theme).shape.borderRadius}px * 2)`,
      borderBottomLeftRadius: `calc(${(theme.vars || theme).shape.borderRadius}px * 2)`,
      borderTopRightRadius: `calc(${(theme.vars || theme).shape.borderRadius}px * 2)`,
      borderBottomRightRadius: `calc(${(theme.vars || theme).shape.borderRadius}px * 2)`,
      borderLeft: `1px solid ${(theme.vars || theme).palette.divider}`,
    },
  [`& .${toggleButtonGroupClasses.lastButton}.${toggleButtonClasses.disabled}, & .${toggleButtonGroupClasses.middleButton}.${toggleButtonClasses.disabled}`]:
    {
      borderLeft: `1px solid ${(theme.vars || theme).palette.action.disabledBackground}`,
    },
  [`& .${toggleButtonClasses.selected}`]: {
    border: `1px solid green !important`,
  },
}));



export const StyledToggleFrequencyButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  gap: '0.5rem',
  display: "flex",
  alignContent: 'flex-start',
  justifyContent: "flex-start",
  flexWrap: 'wrap',

  [`& .${toggleButtonGroupClasses.firstButton},
    & .${toggleButtonGroupClasses.middleButton},
    & .${toggleButtonGroupClasses.lastButton}`]: {
    borderRadius: '20px',
    border: `1px solid ${(theme.vars || theme).palette.divider}`,
    padding: '4px 14px',
    fontSize: '0.8rem',
    textTransform: 'none',
    lineHeight: 1.4,
    minHeight: 0,
  },

  [`& .${toggleButtonGroupClasses.lastButton}.${toggleButtonClasses.disabled},
    & .${toggleButtonGroupClasses.middleButton}.${toggleButtonClasses.disabled}`]: {
    borderLeft: `1px solid ${(theme.vars || theme).palette.action.disabledBackground}`,
  },

  [`& .${toggleButtonClasses.selected}`]: {
    backgroundColor: '#006947 !important',
    color: '#ffffff !important',
    border: '1px solid #006947 !important',
  },
}));