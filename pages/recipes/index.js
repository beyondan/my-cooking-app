// https://mydomain/recipes

import React, { useEffect, useState } from 'react';

// core ui
import { 
  Grid,
} from '@material-ui/core';

// core ui - slider for swiping through components
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// src/
import { API, RecipeCard, Section } from 'components';
import { MainLayout } from 'components/layouts';
import { MainPages } from 'globals';
import useWindowDimensions from 'hooks/useWindowDimensions';
import theme from 'theme';

// styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
}));


function useRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    API.get('/recipes')
      .then(res => setRecipes(res.data))
      .catch(err => console.log(err));
  }, [])

  return recipes;
}

/* * * * * * * * * * * * * * * * * * * *
 *                                     *
 *              Recipes                *
 *                                     *
 * * * * * * * * * * * * * * * * * * * */
export default function Index() {
  const classes = useStyles(theme);

  const recipes = useRecipes();
  const { width: vpWidth, height: vpHeight } = useWindowDimensions();
  const [swimlaneWidth, setSwimlaneWidth] = useState(0);
  const [swimlaneHeight, setSwimlaneHeight] = useState(0);
  const [numCards, setNumCards] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [cardHeight, setCardHeight] = useState(0);

  const BASE_CARD_WIDTH = 180;
  useEffect(() => {
    const _swimlaneWidth = vpWidth-150;
    const _numCards = Math.round(_swimlaneWidth/BASE_CARD_WIDTH);
    const _cardWidth = _swimlaneWidth/_numCards;
    const _cardHeight = _cardWidth/3*4;
    const _swimlaneHeight = _cardHeight;
    console.log(_numCards);
    console.log(_cardWidth + " " + _cardHeight);

    setSwimlaneWidth(_swimlaneWidth);
    setSwimlaneHeight(_swimlaneHeight);
    setNumCards(_numCards);
    setCardWidth(_cardWidth);
    setCardHeight(_cardHeight);
  }, [vpWidth, vpHeight])

  if (!recipes) {
    return <div></div>
  }


  return (
    <MainLayout page={MainPages.Recipes}>
      <Grid container>
        {/* Lane 1 - This week */}
        <Grid item xs={12}>
          <Section title='This Week' />
        </Grid>
        <Grid item xs={12}>
          <Slider 
            dots={true}
            infinite={false}
            speed={500}
            slidesToShow={numCards}
            slidesToScroll={numCards}
            swipe={false}
            style={{
              width: swimlaneWidth,
              height: swimlaneHeight,
              marginLeft: 20,
            }}
          >
            {
              recipes.map((recipe, index) => (
                <div key={index}>
                  <RecipeCard 
                    recipe={recipe} 
                    width={cardWidth} 
                    height={cardHeight} 
                  />
                </div>
              ))
            }
          </Slider>
        </Grid>
      </Grid>
    </MainLayout>
  );
};
