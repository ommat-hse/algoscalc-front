import { Home } from "./components/Home";
import { Algorithm } from "./components/Algorithm";

const AppRoutes = [
  {
    index: true,
    path: "/",
    element: <Home />
  },
  {
    index: true,
    path: "/algorithm",
    element: <Algorithm />
  }
];

export default AppRoutes;
