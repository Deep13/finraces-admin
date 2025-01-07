

import { Flowbite, ThemeModeScript } from 'flowbite-react';
import customTheme from './utils/theme/custom-theme';
import router from './routes/Router';
import { RouterProvider } from 'react-router';

function App() {


  return (
    <>
      <ThemeModeScript />
      <Flowbite theme={{ theme: customTheme }}>
          <RouterProvider router={router} />
      </Flowbite>
    </>
  );
}

export default App;
