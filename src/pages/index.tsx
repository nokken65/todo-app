import { useStore } from 'effector-react';
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { userModel } from '~/entities/User';
import { ROUTE_PATHS } from '~/shared/constants';

const FeedRoute = lazy(() => import('./Feed'));
const SignInRoute = lazy(() => import('./SignIn'));

const Routing = () => {
  const user = useStore(userModel.selectors.$user);
  // const user = true;

  return (
    <Suspense fallback={<>...</>}>
      <Routes>
        <Route path={ROUTE_PATHS.index}>
          {/* TODO: remove blink signin page after auth */}
          {user ? (
            <>
              <Route index element={<Navigate to={ROUTE_PATHS.feed} />} />
              <Route element={<FeedRoute />} path={ROUTE_PATHS.feed} />
            </>
          ) : (
            <>
              <Route index element={<Navigate to={ROUTE_PATHS.signin} />} />
              <Route element={<SignInRoute />} path={ROUTE_PATHS.signin} />
            </>
          )}
          <Route element={<Navigate to={ROUTE_PATHS.index} />} path='*' />
        </Route>
      </Routes>
    </Suspense>
  );
};

export { Routing };
