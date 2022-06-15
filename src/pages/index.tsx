import { useStore } from 'effector-react';
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { userModel } from '~/entities/User';
import { ROUTE_PATHS } from '~/shared/constants';

const FeedRoute = lazy(() => import('./Feed'));
const TodoListsRoute = lazy(() => import('./Feed/TodoListsRoute'));
const SignInRoute = lazy(() => import('./SignIn'));

const Routing = () => {
  const user = useStore(userModel.selectors.$user);
  // const user = true;

  return (
    <Suspense fallback={<>...</>}>
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
          <Route path={ROUTE_PATHS.index}>
            <Route index element={<Navigate to={ROUTE_PATHS.signin} />} />
            <Route element={<SignInRoute />} path={ROUTE_PATHS.signin} />
          </Route>
        )}
        <Route element={<Navigate to={ROUTE_PATHS.index} />} path='*' />
      </Routes>
    </Suspense>
  );
};

export { Routing };
