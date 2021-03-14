import { createMuiTheme } from '@material-ui/core/styles';

export let theme = createMuiTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
    },
    secondary: {
      light: '#63ccff',
      main: '#888888',
      dark: '#4e4e4e',
    },
    action: {
      light: '##3cf34d',
      main: '#4CAF55',
      dark: '#0f6f18',
    },
  },
  typography: {
    p: {
      // fontSize: 20,
    },
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: '#313131',
      },
    },
    MuiButton: {
      label: {
        textTransform: 'none',
      },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
      },
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing(1),
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white,
      },
    },
    MuiTab: {
      root: {
        textTransform: 'none',
        margin: '0 16px',
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up('md')]: {
          padding: 0,
          minWidth: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1),
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#404854',
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: 'inherit',
        marginRight: 0,
        '& svg': {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
    MuiList: {
      root: {
        overflowY: 'scroll',
        height: '100%',
        position: 'absolute',
        width: 240
      }
    }
  },
};

export const drawerWidth = 256;

export const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    padding: theme.spacing(2, 2),
    background: '#eaeff1',
    textAlign: 'left',
    width: 'calc(100% - 240px)',
    [`@media (max-width:  1023px)`]: {
      paddingLeft: theme.spacing(2, 2),
      paddingRight: theme.spacing(2, 2),
      width: '100%'
    },
    alignSelf: 'flex-end'
  },
  footer: {
    padding: theme.spacing(2),
    marginLeft: 240,
    background: '#eaeff1',
    [`@media (max-width:  1023px)`]: {
      marginLeft: 0
    }
  }
};
