import React from 'react';
// core ui
import {
  AppBar,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  Paper,
  Toolbar,
  Tooltip,
} from '@material-ui/core';
// core ui - icons
import SearchIcon from '@material-ui/icons/Search';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import HelpIcon from '@material-ui/icons/Help';

// src/
import { APPNAME } from 'globals';
import { MainPages, LabPages, UserPages } from 'components/layouts';
import theme from 'theme';
// nextjs
import Link from 'next/link';
// styles
import clsx from 'clsx';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

const DRAWER_WIDTH = 60;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  
  /*    appbar styles    */
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    color: theme.palette.background,
    backgroundColor: theme.palette.background,
  },
  appLogo: {
    color: theme.palette.primary.main,
  },
  labButton: {
    color: theme.palette.text.primary,
  },
  accountIcon: {
    color: theme.palette.secondary.main,
  },
  
  /*    drawer styles    */
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  focused: {
    color: theme.palette.text.primary,
  },
  unfocused: {
    color: theme.palette.text.disabled,
  },
}));

/* * * * * * * * * * * * * * * * * * * *
 *                                     *
 *           Main Layout               *
 *                                     *
 * * * * * * * * * * * * * * * * * * * */
export default function MainLayout({ page, children }) {
  const classes = useStyles(theme);

  const css_toggleFocus = (appPage) => clsx({
    [classes.focused]: page.id == appPage.id,
    [classes.unfocused]: page.id != appPage.id,
  });

  return (
    <ThemeProvider theme={theme}>
  
      <div className={classes.root}>
        <CssBaseline />

        {/******************* [ AppBar ] *******************/}
        <AppBar position='fixed' className={classes.appBar} color='default'>
          <Toolbar>

            {/* App logo, click to go to home */}
            <Link href={MainPages.Home.href}>
              <Button className={classes.appLogo}>{APPNAME}</Button>
            </Link>

            {/* Go to lab button */}
            <Link href={LabPages.Home.href}>
              <Button className={classes.labButton}>
                Lab
              </Button>
            </Link>

            <Tooltip title={UserPages.MyAccount.display}>
              <Button className={classes.accountIcon}>
                <AccountCircleIcon />
              </Button>
            </Tooltip>
          </Toolbar>
        </AppBar>

        {/******************* [ Drawer ] *******************/}
        <Drawer
          variant='permanent'
          className={classes.drawer}
          classes={{ paper: classes.drawerPaper }}
          color='default'
        >
          <Toolbar />

          {/* Drawer items */}
          <List>

            {/* Home */}
            <Link href={MainPages.Home.href}>
              <Tooltip title={MainPages.Home.display}>
                <ListItem button key={MainPages.Home.id}>
                  <ListItemIcon className={css_toggleFocus(MainPages.Home)}>
                    <HomeIcon />
                  </ListItemIcon>
                </ListItem>
              </Tooltip>
            </Link>

            <Divider />

            <Link href={MainPages.Recipes.href}>
              <Tooltip title={MainPages.Recipes.display}>
                <ListItem button key={MainPages.Recipes.id}>
                  <ListItemIcon className={css_toggleFocus(MainPages.Recipes)}>
                    <RestaurantMenuIcon />
                  </ListItemIcon>
                </ListItem>
              </Tooltip>
            </Link>

            <Divider />

            {/* Help */}
            <Link href={MainPages.Help.href}>
              <Tooltip title={MainPages.Help.display}>
                <ListItem button key={MainPages.Help.id}>
                  <ListItemIcon className={css_toggleFocus(MainPages.Help)}>
                    <HelpIcon />
                  </ListItemIcon>
                </ListItem>
              </Tooltip>
            </Link>

            <Divider />
          </List>
        </Drawer>

        {/******************* [ Content ] *******************/}
        <main className={classes.content}>
          <Toolbar />
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}
