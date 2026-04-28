import { RouterProvider } from '@tanstack/react-router';
import { router } from './router/router.tsx';
import "./App.css";

const App = () => {
  return (<RouterProvider router={router} />);
}

export default App;