import React from 'react';
import { useRouter } from 'next/router';
import { MainLayout } from 'components/layouts';
import { MainPages } from 'globals';
import RecipeOverview from './RecipeOverview';

export default function Recipe() {
  const router = useRouter();
  const { rid } = router.query;

  return (
    <MainLayout page={MainPages.Recipes}>
      <RecipeOverview rid={rid} />
    </MainLayout>
  )
};