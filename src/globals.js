export const APPNAME = 'My Cooking App';
export const MainPages = {
  Home: {
    id: 'AppHome',
    href: '/home',
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
    href: '/lab/home',
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

export const dummyRecipes = [
  {
    id: 0,
    title: 'Shrimp and Chorizo Paella',
    author: 'Daniel Byun',
    summary: 'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.',
    uploaded: '2021-07-19 23:04:32',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1591535375570-5f70748e0569?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    id: 1,
    title: 'Kimchi Stew',
    author: 'Daniel Byun',
    summary: 'Easy to cook and delicious comfort food. Never get tired of this!',
    uploaded: '2021-07-19 22:23:10',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1618351708186-5ba8a9da1933?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      },
    ],
  },
  {
    id: 2,
    title: 'Galbi-tang',
    author: 'Daniel Byun',
    summary: 'Somewhat difficult to make, but you will not be disappointed! Hated by nobody, everybodys favorite! You need to try this out today!',
    uploaded: '2021-07-19 20:19:43',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1478749485505-2a903a729c63?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      },
    ],
  },
]

export const dummyIngredients = [
  // Recipe 0 - Shrimp and Chorizo Paella
  {
    id: 0,
    rid: 0,
    iid: 0,
    name: 'Olive oil',
    amount: '2 tbsp',
  },
  {
    id: 1,
    rid: 0,
    iid: 1,
    name: 'Bomba rice/Arborio',
    amount: '1.5 cups',
  },
  {
    id: 2,
    rid: 0,
    iid: 2,
    name: 'Chicken stock',
    amount: '3 cups',
  },
  {
    id: 3,
    rid: 0,
    iid: 3,
    name: 'Onion - diced',
    amount: '1',
  },
  {
    id: 4,
    rid: 0,
    iid: 4,
    name: 'Garlic - minced',
    amount: '4 cloves',
  },
  {
    id: 5,
    rid: 0,
    iid: 5,
    name: 'Tomato paste',
    amount: '2 tbsp',
  },
  {
    id: 6,
    rid: 0,
    iid: 6,
    name: 'Smoked paprika',
    amount: '1 tsp',
  },
  {
    id: 7,
    rid: 0,
    iid: 7,
    name: 'Saffon threads',
    amount: '1 tsp / 2 pinches',
  },
  {
    id: 8,
    rid: 0,
    iid: 8,
    name: 'Turmeric',
    amount: '1/2 tsp',
  },
  {
    id: 9,
    rid: 0,
    iid: 9,
    name: 'Red chili flakes',
    amount: '1/2 tsp',
  },
  {
    id: 10,
    rid: 0,
    iid: 10,
    name: 'Kosher salt',
    amount: '1 tsp',
  },
  {
    id: 11,
    rid: 0,
    iid: 11,
    name: 'Spanish Chorizo',
    amount: '8 oz',
  },
  {
    id: 12,
    rid: 0,
    iid: 12,
    name: 'Raw shrimp',
    amount: '1 lb',
  },
  // Recipe 1 - Kimchi Stew
  {
    id: 50,
    rid: 1,
    iid: 0,
    name: 'Oil',
    amount: '1 tbsp',
  },
  {
    id: 51,
    rid: 1,
    iid: 1,
    name: 'Onion - thinly sliced',
    amount: '1',
  },
  {
    id: 52,
    rid: 1,
    iid: 2,
    name: 'Garlic - sliced',
    amount: '3 cloves',
  },
  {
    id: 53,
    rid: 1,
    iid: 3,
    name: 'Pork belly/shoulder - thinly sliced',
    amount: '8oz (225g)',
  },
  {
    id: 54,
    rid: 1,
    iid: 4,
    name: 'Kimchi - with juices, chopped',
    amount: '1lb (450g)',
  },
  {
    id: 55,
    rid: 1,
    iid: 5,
    name: 'Salt',
    amount: '1 tsp',
  },
  {
    id: 56,
    rid: 1,
    iid: 6,
    name: 'Sugar',
    amount: '2 tsp',
  },
  {
    id: 57,
    rid: 1,
    iid: 7,
    name: 'Korean chili flakes',
    amount: '1 tbsp',
  },
  {
    id: 58,
    rid: 1,
    iid: 8,
    name: 'Gochujang',
    amount: '1 tbsp',
  },
  {
    id: 59,
    rid: 1,
    iid: 9,
    name: 'Chicken stock',
    amount: '3 cups (700 mL)',
  },
  {
    id: 60,
    rid: 1,
    iid: 10,
    name: 'Firm tofu - cut into 1/4-in thick slices',
    amount: '8oz (225g)',
  },
  {
    id: 61,
    rid: 1,
    iid: 61,
    name: 'Sesame oil',
    amount: '1 tsp',
  },
  {
    id: 62,
    rid: 1,
    iid: 62,
    name: 'Scallion - chopped',
    amount: '1 tsp',
  },
  // Recipe 2 - Galbi-tang
  {
    id: 100,
    rid: 2,
    iid: 0,
    name: 'Short ribs',
    amount: '3 lb',
  },
  {
    id: 101,
    rid: 2,
    iid: 1,
    name: 'Korean radish (Mu)',
    amount: '1 lb',
  },
  {
    id: 102,
    rid: 2,
    iid: 2,
    name: 'Medium onion',
    amount: '1',
  },
  {
    id: 103,
    rid: 2,
    iid: 3,
    name: 'Large scallion white parts',
    amount: '2',
  },
  {
    id: 104,
    rid: 2,
    iid: 4,
    name: 'Plump garlic cloves',
    amount: '8',
  },
  {
    id: 105,
    rid: 2,
    iid: 5,
    name: 'Thin ginger slices',
    amount: '3',
  },
  {
    id: 106,
    rid: 2,
    iid: 6,
    name: 'Soup soy sauce',
    amount: '2 tbsp',
  },
  {
    id: 107,
    rid: 2,
    iid: 7,
    name: 'Salt and pepper',
    amount: 'little',
  },
  {
    id: 108,
    rid: 2,
    iid: 8,
    name: 'Starch noodles',
    amount: '3 oz',
  },
  {
    id: 109,
    rid: 2,
    iid: 9,
    name: 'Minced garlic',
    amount: '1 tsp',
  },
  {
    id: 110,
    rid: 2,
    iid: 10,
    name: 'Scallions - finely chopped',
    amount: '2',
  },
  {
    id: 111,
    rid: 2,
    iid: 11,
    name: 'Alablone',
    amount: '4',
  },
];

export const dummySteps = [
  // Recipe 0 - Shrimp and Chorizo Paella
  {
    id: 0,
    rid: 0,
    sid: 0,
    stepText: 'Heat a large paella pan (or large saute pan) over medium heat. Add the olive oil. When oil is hot, add the onion and saute for 5 minutes, until onion is softened and turning golden. Add the garlic and saute for 30 seconds.'
  },
  {
    id: 1,
    rid: 0,
    sid: 1,
    stepText: 'Add the tomato paste and continue to cook until it is completely mixed in and the onions are rust colored, 2- 3 minutes.',
  },
  {
    id: 2,
    rid: 0,
    sid: 2,
    stepText: 'Add the salt, paprika, chili flakes, turmeric and saffron, stir to incorporate.',
  },
  {
    id: 3,
    rid: 0,
    sid: 3,
    stepText: 'Add the rice and stir fry until the rice is completely coated with the oil and spices.',
  },
  {
    id: 4,
    rid: 0,
    sid: 4,
    stepText: 'Stir in the stock. Bring to a simmer.',
  },
  {
    id: 5,
    rid: 0,
    sid: 5,
    stepText: 'Reduce heat to low and simmer for 10 minutes.',
  },
  {
    id: 6,
    rid: 0,
    sid: 6,
    stepText: 'Add in the sliced chorizo and cook for about 5 more minutes.',
  },
  {
    id: 7,
    rid: 0,
    sid: 7,
    stepText: 'Arrange the shrimp on top. You may need to press the shrimp into the rice with a spoon so that they are almost covered with the remaining liquid. Cook for 5-10 more minutes or until liquid is evaporated.',
  },
  {
    id: 8,
    rid: 0,
    sid: 8,
    stepText: 'Sprinkle parsley on top and serve.',
  },

  // Recipe 1 - Kimchi Stew
  {
    id: 50,
    rid: 1,
    sid: 0,
    stepText: 'In a large pot, heat the oil over medium high heat. Add the onion, garlic, and pork belly, and cook for about 5 minutes, until the pork is lightly browned and the onions start to soften.',
  },
  {
    id: 51,
    rid: 1,
    sid: 1,
    stepText: 'Add the kimchi and fry for 2 minutes. Then add the salt, sugar, chili flakes, gochujang, and broth. Stir until combined. Bring to a simmer, cover, and cook for 10 minutes.',
  },
  {
    id: 52,
    rid: 1,
    sid: 2,
    stepText: 'Uncover and lay the tofu over the top. Replace the cover and simmer for another 10 minutes. Uncover for the last time and stir in the sesame oil. Garnish with the chopped scallion and serve immediately with steamed rice!',
  },

  // Recipe 2 - Galbi-tang
  {
    id: 100,
    rid: 2,
    sid: 0,
    stepText: 'Soak the ribs for 30 minutes in cold water. Drain.',
  },
  {
    id: 101,
    rid: 2,
    sid: 1,
    stepText: 'Fill a large pot with enough water to cover the ribs, about 8 cups. Bring water to a boil, and then drop the ribs in. Let it come back to a boil. Continue to boil for 2 to 3 minutes.',
  },
  {
    id: 102,
    rid: 2,
    sid: 2,
    stepText: 'Drain the ribs. Wash the ribs under running water. Clean the pot.',
  },
  {
    id: 103,
    rid: 2,
    sid: 3,
    stepText: 'Return the ribs back to the pot. Add 13 to 14 cups of water, radish, onion, garlic and ginger. Add 2 tablespoons of soup soy sauce and 1 teaspoon of salt (use less if your soup soy sauce is dark and more salt). Bring it to a boil. Continue to boil, uncovered, for 30 minutes over high heat.',
  },
  {
    id: 104,
    rid: 2,
    sid: 4,
    stepText: 'Reduce the heat to medium. Remove all the vegetables. Transfer the radish to a cutting board. Discard the other vegetables.',
  },
  {
    id: 105,
    rid: 2,
    sid: 5,
    stepText: 'Add 2 cups of water. Continue to boil, covered, for about an hour until the meat is tender. Add 1 teaspoon of minced garlic and the optional noodles 3 or 4 minutes before turning the heat off. Cut the radish into thick bite size pieces and add to the soup. Bring everything to a boil again. Salt and pepper to taste. Skim off fat or use a fat separator to remove excess fat. Garnish with the chopped scallions to serve.',
  },
];