// Main application landing page (https://mydomain/).
// Automatically redirects to home page (https://mydomain/home).
import React from 'react';
import { useRouter } from 'next/router';

/* * * * * * * * * * * * * * * * * * * *
 *                                     *
 *   Index page. Redirects to /home.   *
 *                                     *
 * * * * * * * * * * * * * * * * * * * */
export default function Index() {
  const router = useRouter();
  const [loaded, setLoaded] = React.useState(false);

  // Redirect automatically.
  React.useEffect(() => {
    if (router.pathname == '/') {
      router.replace('/home');
    }
    else {
      // Somehow, /index is loaded but the path is not '/'. 
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
