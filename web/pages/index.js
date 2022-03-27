// https://mydomain/home

import React, { useEffect, useState } from 'react';

// core ui
import { 
  Grid,
} from '@material-ui/core';

// core ui - slider for swiping through components

// src/
import { API } from 'components/api';
import { MainLayout, MainPages } from 'components/layouts';
import { RecipeCard, Section, Slider } from 'components/ui';
import { useWindowDimensions } from 'components/hooks';
import theme from 'theme';

// styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
}));

/* * * * * * * * * * * * * * * * * * * *
 *                                     *
 *               Home                  *
 *                                     *
 * * * * * * * * * * * * * * * * * * * */
export default function Index() {
  const classes = useStyles(theme);

  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    API.get('/recipes')
      .then(res => setRecipes(res.data))
      .catch(err => console.log(err));
  }, [])
  
  const BASE_CARD_WIDTH = 180;
  const { width: vpWidth, height: vpHeight } = useWindowDimensions();
  const [swimlaneWidth, setSwimlaneWidth] = useState(0);
  const [swimlaneHeight, setSwimlaneHeight] = useState(0);
  const [numCards, setNumCards] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [cardHeight, setCardHeight] = useState(0);
  useEffect(() => {
    const _swimlaneWidth = vpWidth-150;
    const _numCards = Math.round(_swimlaneWidth/BASE_CARD_WIDTH);
    const _cardWidth = _swimlaneWidth/_numCards;
    const _cardHeight = _cardWidth/3*4;
    const _swimlaneHeight = _cardHeight;

    setSwimlaneWidth(_swimlaneWidth);
    setSwimlaneHeight(_swimlaneHeight);
    setNumCards(_numCards);
    setCardWidth(_cardWidth);
    setCardHeight(_cardHeight);
  }, [vpWidth, vpHeight])

  console.log(swimlaneHeight);
  if (!recipes) {
    return <div></div>
  }
  return (
    <MainLayout page={MainPages.Home}>
      <Grid container>
        {/* Lane 1 - This week */}
        <Grid item xs={12}>
          <Section title='My Favorites' />
        </Grid>
        <Grid item xs={12}>
          <Slider
            width={swimlaneWidth}
            height={swimlaneHeight}
            slidesToShow={numCards}
            slidesToScroll={numCards}
            scrollSpeed={500}
          >
            {
              recipes.map((recipe, index) => {
                <div key={index}>
                  <RecipeCard 
                    recipe={recipe} 
                    width={cardWidth} 
                    height={cardHeight} 
                  />
                </div>
              })
            }
          </Slider>
        </Grid>
        <Grid item xs={12}>
          <h1>HELLO</h1>
        </Grid>
      </Grid>
    </MainLayout>
  );
};
