import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import styles from './App.module.css'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

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
const DataModel = lazy(() => import('./pages/DataModel/DataModel'))
const ReportDiff = lazy(() => import('./pages/ReportDiff'))
const ChangeReport = lazy(() => import('./pages/ChangeReport'))
const GDCSource = lazy(() => import('./pages/DataSources/GDCSource/GDCSource'))
const CTDCSource = lazy(
  () => import('./pages/DataSources/CTDCSource/CTDCSource')
)
const ICDCSource = lazy(
  () => import('./pages/DataSources/ICDCSource/ICDCSource')
)
const PCDCSource = lazy(
  () => import('./pages/DataSources/PCDCSource/PCDCSource')
)
const MappingReport = lazy(() => import('./pages/MappingReport'))
const Profile = lazy(() => import('./pages/Profile/Profile'))
const ModelBuilder = lazy(() => import('./pages/ModelBuilder'))
const UserManagement = lazy(
  () => import('./pages/UserManagement/UserManagement')
)
const NotFound = lazy(() => import('./pages/NotFound/NotFound'))

const App = () => {
  return (
    <BrowserRouter basename={'/evssip'}>
      <div id="main" className={styles.main}>
        <Header />
        <NavigationBar />
        <Layout>
          <Suspense fallback={<LoadingAnimation />}>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/datamodel" element={<DataModel />} />
              <Route path="/about" element={<About />} />
              <Route path="/apidocs" element={<APIDocs />} />
              <Route path="/reportdiff" element={<ReportDiff />} />
              <Route path="/changereport" element={<ChangeReport />} />
              <Route
                exact
                path="/mainboard"
                element={
                  <RequireAuthorization>
                    <GDCSource />
                  </RequireAuthorization>
                }
              />
              <Route
                exact
                path="/mainboard/gdc"
                element={
                  <RequireAuthorization>
                    <GDCSource />
                  </RequireAuthorization>
                }
              />
              <Route
                exact
                path="/mainboard/ctdc"
                element={
                  <RequireAuthorization>
                    <CTDCSource />
                  </RequireAuthorization>
                }
              />

              <Route
                exact
                path="/mainboard/icdc"
                element={
                  <RequireAuthorization>
                    <ICDCSource />
                  </RequireAuthorization>
                }
              />
              <Route
                exact
                path="/mainboard/pcdc"
                element={
                  <RequireAuthorization>
                    <PCDCSource />
                  </RequireAuthorization>
                }
              />
              <Route path="/mappingreport" element={<MappingReport />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/modelbuilder" element={<ModelBuilder />} />
              <Route
                exact
                path="/usermanagement"
                render={() => (
                  <RequireAuthorization>
                    <UserManagement />
                  </RequireAuthorization>
                )}
              />
              <Route element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
