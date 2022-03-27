// https://mydomain/help

import React from 'react';
import { MainLayout, MainPages } from 'components/layouts';

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
