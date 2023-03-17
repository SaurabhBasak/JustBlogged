import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./components/HomePage/Homepage";
import PostDetail from "./components/Posts/PostDetail";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/posts" />
        </Route>
        <Route path="/posts" exact>
          <Homepage />
        </Route>
        <Route path="/posts/:post_id">
          <PostDetail />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
