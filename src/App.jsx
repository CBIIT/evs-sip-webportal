import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import styles from './App.module.css'
import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// components
import Header from './layouts/Header/Header'
import NavigationBar from './layouts/NavigationBar/NavigationBar'
import Footer from './layouts/Footer/Footer'
import Layout from './layouts/Layout/Layout'
import RequireAuthorization from './components/RequireAuthorization/RequireAuthorization'
import LoadingAnimation from './components/LoadingAnimation/LoadingAnimation'

// pages
const Home = lazy(() => import('./pages/Home/Home'))
const About = lazy(() => import('./pages/About/About'))
const APIDocs = lazy(() => import('./pages/APIDocs/APIDocs'))
const Search = lazy(() => import('./pages/Search'))
const DataModel = lazy(() => import('./pages/DataModel'))
const ReportDiff = lazy(() => import('./pages/ReportDiff'))
const ChangeReport = lazy(() => import('./pages/ChangeReport'))
const GDCSource = lazy(() => import('./pages/DataSources/GDCSource/GDCSource'))
const CTDCSource = lazy(() => import('./pages/DataSources/CTDCSource/CTDCSource'))
const ICDCSource = lazy(() => import('./pages/DataSources/ICDCSource/ICDCSource'))
const PCDCSource = lazy(() => import('./pages/DataSources/PCDCSource'))
const MappingReport = lazy(() => import('./pages/MappingReport'))
const Profile = lazy(() => import('./pages/Profile'))
const ModelBuilder = lazy(() => import('./pages/ModelBuilder'))
const UserManagement = lazy(() => import('./pages/UserManagement/UserManagement'))
const NotFound = lazy(() => import('./pages/NotFound/NotFound'))

const App = () => {
  return (
    <Router basename={'/evssip'}>
      <div id="main" className={styles.main}>
        <Header />
        <NavigationBar />
        <Layout>
          <Suspense fallback={<LoadingAnimation/>}>
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
          </Suspense>
        </Layout>
        <Footer />
      </div>
    </Router>
  )
}

export default App
