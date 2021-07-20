import React from 'react';
import { useRouter } from 'next/router';
import { MainLayout } from 'components/layouts';
import { MainPages } from 'globals';
import RecipeGuide from './RecipeGuide';

export default function Cook() {
  const router = useRouter();
  const { rid } = router.query;

  return (
    <MainLayout page={MainPages.Recipes}>
      <RecipeGuide rid={rid} />
    </MainLayout>
  )
};
