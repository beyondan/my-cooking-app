// Main Lab loading page (https://mydomain/lab/home)

import React from 'react';
import { LabLayout } from 'components/layouts';
import { LabPages } from 'globals';

/* * * * * * * * * * * * * * * * * * * *
 *                                     *
 *         Lab Home - Index            *
 *                                     *
 * * * * * * * * * * * * * * * * * * * */
export default function Home() {
  return (
    <LabLayout page={LabPages.Home}>
      <h1>Home page</h1>
    </LabLayout>
  )
};
