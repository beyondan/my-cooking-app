
import React from 'react';
import { MainLayout } from 'components/layouts';
import { MainPages } from 'globals';

export default function Recipes() {
  return (
    <MainLayout page={MainPages.Recipes}>
      <h1>Recipes</h1>
    </MainLayout>
  );
}
