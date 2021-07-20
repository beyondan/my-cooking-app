// Recipe page (https://mydomain/recipes/[rid]).
// Automatically redirects to recipe overview page 
//   (https://mydomain/recipes/[rid]/cook).
import React from 'react';
import { useRouter } from 'next/router';

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                         *
 *    Redirects /recipes/[rid] to /recipes/[rid]/cook.     *
 *                                                         *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
export default function RecipesRid() {
  const router = useRouter();
  const [loaded, setLoaded] = React.useState(false);

  // Redirect automatically.
  React.useEffect(() => {
    const { rid } = router.query;
    if (router.pathname == `/recipes/[rid]`) {
      router.replace(`/recipes/${rid}/cook`);
    }
    else {
      // Somehow, /recipes/[rid]/index is loaded,
      // but the path is not '/recipes/[rid]'. 
      // AFAIK, this should never happen.
      setLoaded(true);
    }
  }, [router])

  if (!loaded){
    return <div></div>;
  }

  return <div></div>;
}
