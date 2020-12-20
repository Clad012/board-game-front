import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import GameView from "./views/Game";
import HomeView from "./views/Home";

// If your app is big + you have routes with a lot of components, you should consider
// code-splitting your routes! If you bundle stuff up with Webpack, I recommend `react-loadable`.
//
// $ yarn add react-loadable
// $ yarn add --dev @types/react-loadable
//
// The given `pages/` directory provides an example of a directory structure that's easily
// code-splittable.
const reload = () => window.location.reload();

const Routes: React.SFC = () => (
  <Switch>
    <Route exact path="/" component={HomeView} />
    <Route exact path="/play" component={GameView} />
    <Route exact path="/start" component={HomeView} />
    <Route path="/home/index.html" onEnter={reload} />

    <Route component={() => <div>Not Found</div>} />
  </Switch>
);

export default Routes;
