import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Home from './pages/Home/Home';
import Application from './pages/Application/Application';
import Section from "./pages/Section/Section";
import TermsAndPolicies from "./pages/TermsAndPolicies/TermsAndPolicies";
import Publish from "./pages/Publish/Publish";
import Row from "./pages/row"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/application/:title" component={Application} />
        <Route exact path="/application/:title/sections/:sid" component={Section} />
        <Route exact path="/application/:title/section/:id" component={Row} />
        <Route exact path="/application/:title/terms-and-policies" component={TermsAndPolicies} />
        <Route exact path="/application/:randomurl/apply" component={Publish} />
      </Switch>
    </Router>
  );
}

export default App;
