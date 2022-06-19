import { useStore } from 'effector-react';
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { userModel } from '~/entities/User';
import { ROUTE_PATHS } from '~/shared/constants';
import { LoaderRingIcon } from '~/shared/icons';
import { Notifications } from '~/widgets/Notifications';

import { SignInActionButtonRoute } from './Welcome/SignInRoute';

const WelcomeRoute = lazy(() => import('./Welcome'));
const SignInRoute = lazy(() => import('./Welcome/SignInRoute'));

const FeedRoute = lazy(() => import('./Feed'));
const TodoListsRoute = lazy(() => import('./Feed/TodoListsRoute'));

const Routing = () => {
  const user = useStore(userModel.selectors.$user);

  return (
    <Suspense
      fallback={
        <div className='flex items-center justify-center w-full h-full min-h-screen'>
          <LoaderRingIcon className='animate-spin-fast' />
        </div>
      }
    >
      <Routes>
        {/* TODO: remove blink signin page after auth */}
        {user ? (
          <Route path={ROUTE_PATHS.index}>
            <Route index element={<Navigate to={ROUTE_PATHS.feed} />} />
            <Route element={<FeedRoute />} path={ROUTE_PATHS.feed}>
              <Route index element={<TodoListsRoute />} />
            </Route>
          </Route>
        ) : (
          <Route element={<WelcomeRoute />} path={ROUTE_PATHS.index}>
            <Route index element={<SignInActionButtonRoute />} />
            <Route element={<SignInRoute />} path={ROUTE_PATHS.signin} />
          </Route>
        )}
        <Route element={<Navigate to={ROUTE_PATHS.index} />} path='*' />
      </Routes>
      {/* Notifications */}
      <Notifications />
    </Suspense>
  );
};

export { Routing };
