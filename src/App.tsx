import React, { useEffect } from "react";
import "./App.css";
import { Affix, Layout } from "antd";
import { AppHeader } from "./components/appHeader/AppHeader";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, Note, RoadMap } from "./components/sections";
import { openNotificationWithIcon } from "./utils/components";
import { About } from "./components/sections/About/About";

function App() {
  const hasVisited = localStorage.getItem("dlog__user");

  useEffect(() => {
    if (!hasVisited) {
      openNotificationWithIcon({
        description:
          "It might take a while to see Logs because of heroku servers",
        title: "Welcome to Devlog!",
        type: "info",
      });
      localStorage.setItem("dlog__user", JSON.stringify(true));
    }
  }, [hasVisited]);

  return (
    <div>
      <Layout id="App">
        <Router>
          <Affix offsetTop={0.1}>
            <AppHeader />
          </Affix>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/note/:note" component={Note} />
            <Route exact path="/roadmap" component={RoadMap} />
            <Route exact path="/about" component={About} />
            {/* <Route exact path="/create-note" component={CreateNote} /> */}
          </Switch>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
