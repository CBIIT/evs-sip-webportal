import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


// components
import Header from './components/Header';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import Layout from './components/Layout';
import RequireAuthorization from './components/RequireAuthorization/RequireAuthorization';

// Pages
import Home from './features/Home';
import About from './features/About';
import Search from './features/Search';
import DataModel from './features/DataModel';
import ReportDiff from './features/ReportDiff';
import ChangeReport from './features/ChangeReport';
import DataSources from './features/DataSources/GDCSource';
import GDCSource from './features/DataSources/GDCSource';
import CTDCSource from './features/DataSources/CTDCSource/CTDCSource';
import ICDCSource from './features/DataSources/ICDCSource/ICDCSource';
import PCDCSource from './features/DataSources/PCDCSource';
import MappingReport from './features/MappingReport';
import Profile from './features/Profile';
import ModelBuilder from './features/ModelBuilder';
import UserManagement from './features/UserManagement/UserManagement';
import NotFound from './features/NotFound';


const MainContainer = styled.div`
  position: relative;
  min-height: 100vh;
`

function App() {
  return (
      <Router basename={'/evssip'}>
        <MainContainer>
          <Header/>
          <NavigationBar/>
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/search" component={Search} />
              <Route path="/datamodel" component={DataModel} />
              <Route path="/about" component={About} />
              <Route path="/reportdiff" component={ReportDiff} />
              <Route path="/changereport" component={ChangeReport} />
              <Route exact path="/mainboard" render={() => 
                <RequireAuthorization>
                  <DataSources />
                </RequireAuthorization>} />
              <Route exact path="/mainboard/gdc" render={() => 
                <RequireAuthorization>
                  <GDCSource />
                </RequireAuthorization>} />
              <Route exact path="/mainboard/ctdc" render={() => 
                <RequireAuthorization>
                  <CTDCSource />
                </RequireAuthorization>} />
              <Route exact path="/mainboard/icdc" render={() => 
                <RequireAuthorization>
                  <ICDCSource />
                </RequireAuthorization>} />
              <Route exact path="/mainboard/pcdc" render={() => 
                <RequireAuthorization>
                  <PCDCSource />
                </RequireAuthorization>} />
              <Route path="/mappingreport" component={MappingReport} />
              <Route path="/profile" component={Profile} />
              <Route path="/modelbuilder" component={ModelBuilder} />
              <Route exact path="/usermanagement" render={() => 
                <RequireAuthorization>
                  <UserManagement />
                </RequireAuthorization>} />
              <Route component={NotFound} />
            </Switch>
          </Layout>
          <Footer/>
        </MainContainer>
      </Router>
  );
}

export default App;
