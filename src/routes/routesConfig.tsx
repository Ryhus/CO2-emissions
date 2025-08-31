import { createBrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';

import { Loader } from '@/components';
import { Home } from '@/pages';

const router = createBrowserRouter([
  {
    path: '/',
    Component: () => (
      <Suspense fallback={<Loader />}>
        <Home />
      </Suspense>
    ),
  },
]);

export default router;
