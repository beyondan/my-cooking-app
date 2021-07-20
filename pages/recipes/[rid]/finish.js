import React from 'react';
import { useRouter } from 'next/router';

import { MainLayout } from 'components/layouts';
import { MainPages, dummyRecipes } from 'globals';
import theme from 'theme';
import { Button, Link } from '@material-ui/core';

export default function Finish() {
  const router = useRouter();
  const { rid } = router.query;
  const recipe = dummyRecipes.find(r => `${r.id}` === rid);
  
  if (recipe) {
    return (
      <MainLayout page={MainPages.Recipes}>
        <h1>Congratulations!</h1>
        <h1>You finished cooking: <br/> {recipe.title} </h1>
        <Link href='/'>
          <Button variant='outlined' color='secondary' size='large' style={{marginTop: theme.spacing(2)}}>
            Return to home page.
          </Button>
        </Link>
      </MainLayout>
    );
  }
  else {
    return <div></div>;
  }
}