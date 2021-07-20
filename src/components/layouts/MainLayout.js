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
import { APPNAME, MainPages, KitchenPages, UserPages } from 'globals';
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
  },
  appLogo: {
    color: theme.palette.primary.main,
  },
  searchBar: {
    flex: 1,
    margin: theme.spacing(0, 10),
    alignItems: 'center',
    display: 'flex',
    border: `1px solid ${theme.palette.background.scale(5)}`,
  },
  searchInput: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  searchButton: {
    marginLeft: theme.spacing(2),
    padding: 10,
  },
  
  /*    drawer styles    */
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
    backgroundColor: theme.palette.background,
  },
  focused: {
    color: theme.palette.primary.dark,
  },
  unfocused: {
    color: theme.palette.primary.light,
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

            {/* Search bar */}
            <Paper component='form' className={classes.searchBar}>
              <InputBase
                placeholder='Search'
                inputProps={{ 'aria-label': 'search' }}
                className={classes.searchInput}
              />
              <IconButton type='submit' className={classes.searchButton}>
                <SearchIcon />
              </IconButton>
            </Paper>

            {/* Go to kitchen button */}
            <Link href={KitchenPages.NewRecipe.href}>
              <Tooltip title={KitchenPages.NewRecipe.display}>
                <Button color='primary'>
                  <RestaurantMenuIcon />
                </Button>
              </Tooltip>
            </Link>

            <Tooltip title={UserPages.MyAccount.display}>
              <Button color='primary'>
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
