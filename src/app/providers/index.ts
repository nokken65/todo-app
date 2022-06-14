import { composeFunc } from '~/shared/utils';

import { withRouter } from './withRouter';

export const withProviders = composeFunc(withRouter);
