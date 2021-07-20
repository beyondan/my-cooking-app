export const APPNAME = 'My Cooking App';
export const MainPages = {
  Home: {
    id: 'AppHome',
    href: '/home',
    display: 'home',
  },
  Help: {
    id: 'AppHelp',
    href: '/help',
    display: 'help',
  },
};

export const KitchenPages = {
  Home: {
    id: 'KitchenHome',
    href: '/kitchen/home',
    display: 'home',
  },
  NewRecipe: {
    id: 'KitchenNewRecipe',
    href: '/kitchen/newRecipe',
    display: 'add new recipe',
  },
}

export const UserPages = {
  MyAccount: {
    id: 'MyAccount',
    href: (accountId) => `/account/${accountId}`,
    display: 'my account'
  }
}