// https://mydomain/help

import React from 'react';
import { MainLayout } from 'components/layouts';
import { MainPages } from 'globals';

/* * * * * * * * * * * * * * * * * * * *
 *                                     *
 *                 Help                *
 *                                     *
 * * * * * * * * * * * * * * * * * * * */
export default function Help() {
  return (
    <MainLayout page={MainPages.Help}>
      <h1>Help page.</h1>
    </MainLayout>
  )
};
