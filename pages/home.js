// https://mydomain/home

import React from 'react';
import { MainLayout } from 'components/layouts';
import { MainPages } from 'globals';

/* * * * * * * * * * * * * * * * * * * *
 *                                     *
 *                 Home                *
 *                                     *
 * * * * * * * * * * * * * * * * * * * */
export default function Home() {
  return (
    <MainLayout page={MainPages.Home}>
      <h1>Home page</h1>
    </MainLayout>
  )
};
