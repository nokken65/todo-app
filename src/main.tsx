import ReactDOM from 'react-dom/client';

import { App } from '~/app';

const appRoot = document.getElementById('app-root');

if (!appRoot) {
  throw new Error("Cannot find element with id 'root'");
}

ReactDOM.createRoot(appRoot).render(<App />);
