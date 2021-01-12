import { useReactiveVar } from "@apollo/client";

import { isLoggedInVar } from "./GlobalLib/Apollo/LocalState/LocalState";
import { LoggedInRouter } from "./routers/logged-in-router";
import LoggedOutRouter from "./routers/logged-out-router";

export const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
};
