import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Jobs from './components/Jobs'
import ProtectedRoute from './components/ProtectedRoute'
import JobDetails from './components/JobDetails'
import NotFound from './components/NotFound'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <BrowserRouter>
    <Switch>
      <ProtectedRoute exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/Jobs" component={Jobs} />
      <Route exact path="/jobs/:id" component={JobDetails} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
