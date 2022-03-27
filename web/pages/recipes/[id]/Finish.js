import React from 'react';
import theme from 'theme';
import { Button } from '@material-ui/core';
import Link from 'next/link';

export default function Finish(props) {
  return (
    <div>
      <h1>Congratulations!</h1>
      <h1>You finished cooking: <br/> {props.recipe?.title} </h1>
      <Link href='/'>
        <Button variant='outlined' color='secondary' size='large' style={{marginTop: theme.spacing(2)}}>
          Return to home page.
        </Button>
      </Link>
    </div>
  );
}
