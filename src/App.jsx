import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import styles from './App.module.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// components
import Header from './components/Header/Header'
import NavigationBar from './components/NavigationBar/NavigationBar'
import Footer from './components/Footer/Footer'
import Layout from './components/Layout/Layout'
import RequireAuthorization from './components/RequireAuthorization/RequireAuthorization'

// Pages
import Home from './pages/Home/Home'
import About from './pages/About/About'
import APIDocs from './pages/APIDocs/APIDocs'
import Search from './pages/Search'
import DataModel from './pages/DataModel'
import ReportDiff from './pages/ReportDiff'
import ChangeReport from './pages/ChangeReport'
import GDCSource from './pages/DataSources/GDCSource'
import CTDCSource from './pages/DataSources/CTDCSource/CTDCSource'
import ICDCSource from './pages/DataSources/ICDCSource/ICDCSource'
import PCDCSource from './pages/DataSources/PCDCSource'
import MappingReport from './pages/MappingReport'
import Profile from './pages/Profile'
import ModelBuilder from './pages/ModelBuilder'
import UserManagement from './pages/UserManagement/UserManagement'
import NotFound from './pages/NotFound/NotFound'

const App = () => {
  return (
    <Router basename={'/evssip'}>
      <div id='test1' className={styles.main}>
        <Header />
        <NavigationBar />
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/search" component={Search} />
            <Route path="/datamodel" component={DataModel} />
            <Route path="/about" component={About} />
            <Route path="/apidocs" component={APIDocs} />
            <Route path="/reportdiff" component={ReportDiff} />
            <Route path="/changereport" component={ChangeReport} />
            <Route
              exact
              path="/mainboard"
              render={() => (
                <RequireAuthorization>
                  <GDCSource />
                </RequireAuthorization>
              )}
            />
            <Route
              exact
              path="/mainboard/gdc"
              render={() => (
                <RequireAuthorization>
                  <GDCSource />
                </RequireAuthorization>
              )}
            />
            <Route
              exact
              path="/mainboard/ctdc"
              render={() => (
                <RequireAuthorization>
                  <CTDCSource />
                </RequireAuthorization>
              )}
            />
            <Route
              exact
              path="/mainboard/icdc"
              render={() => (
                <RequireAuthorization>
                  <ICDCSource />
                </RequireAuthorization>
              )}
            />
            <Route
              exact
              path="/mainboard/pcdc"
              render={() => (
                <RequireAuthorization>
                  <PCDCSource />
                </RequireAuthorization>
              )}
            />
            <Route path="/mappingreport" component={MappingReport} />
            <Route path="/profile" component={Profile} />
            <Route path="/modelbuilder" component={ModelBuilder} />
            <Route
              exact
              path="/usermanagement"
              render={() => (
                <RequireAuthorization>
                  <UserManagement />
                </RequireAuthorization>
              )}
            />
            <Route component={NotFound} />
          </Switch>
        </Layout>
        <Footer />
      </div>
    </Router>
  )
}

export default App
