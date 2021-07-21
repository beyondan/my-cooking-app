import React from 'react';
import { useRouter } from 'next/router';
import { MainLayout } from 'components/layouts';
import { MainPages } from 'globals';
import RecipeOverview from './RecipeOverview';

export default function RecipesRid() {
  const router = useRouter();
  const { rid } = router.query;
  if (!rid) {
    return <></>;
  }

  return (
    <MainLayout page={MainPages.Recipes}>
      <RecipeOverview rid={rid} />
    </MainLayout>
  );
};
