// Main application landing page (https://mydomain/lab).
// Automatically redirects to home page (https://mydomain/lab/home).
import React from 'react';
import { useRouter } from 'next/router';

/* * * * * * * * * * * * * * * * * * * *
 *                                     *
 *    Redirects /lab to /lab/home.     *
 *                                     *
 * * * * * * * * * * * * * * * * * * * */
export default function Lab() {
  const router = useRouter();
  const [loaded, setLoaded] = React.useState(false);

  // Redirect automatically.
  React.useEffect(() => {
    if (router.pathname == '/lab') {
      router.replace('/lab/home');
    }
    else {
      // Somehow, /lab/index is loaded but the path is not '/lab'. 
      // AFAIK, this should never happen.
      setLoaded(true);
    }
  }, [])

  if (!loaded){
    return <div></div>;
  }

  return (
    <div>
    </div>
  );
}
