import MainLayout from './MainLayout';
import LabLayout from './LabLayout';

export { MainLayout, LabLayout };
export const MainPages = {
  Home: {
    id: 'AppHome',
    href: '/',
    display: 'home',
  },
  Recipes: {
    id: 'AppRecipes',
    href: '/recipes',
    display: 'recipes',
  },
  Help: {
    id: 'AppHelp',
    href: '/help',
    display: 'help',
  },
};

export const LabPages = {
  Home: {
    id: 'LabHome',
    href: '/lab',
    display: 'lab home',
  },
  NewRecipe: {
    id: 'LabNewRecipe',
    href: '/lab/newRecipe',
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
