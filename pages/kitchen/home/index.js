// Main kitchen loading page (https://mydomain/kitchen)

import React from 'react';
import { KitchenLayout } from 'components/layouts';
import { KitchenPages } from 'globals';

/* * * * * * * * * * * * * * * * * * * *
 *                                     *
 *       Kitchen Home - Index          *
 *                                     *
 * * * * * * * * * * * * * * * * * * * */
export default function Home() {
  return (
    <KitchenLayout page={KitchenPages.Home}>
      <h1>Home page</h1>
    </KitchenLayout>
  )
};
