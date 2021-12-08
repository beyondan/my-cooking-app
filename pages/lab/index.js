// Main Lab loading page (https://mydomain/lab/home)

import React from 'react';
import { LabLayout, LabPages } from 'components/layouts';

/* * * * * * * * * * * * * * * * * * * *
 *                                     *
 *         Lab Home - Index            *
 *                                     *
 * * * * * * * * * * * * * * * * * * * */
export default function Index() {
  return (
    <LabLayout page={LabPages.Home}>
      <h1>Home page</h1>
    </LabLayout>
  )
};
