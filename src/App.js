import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import {Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from './components/Header'
import NavigationBar from './components/NavigationBar'
import Home from './pages/Home/Home'
import Footer from './components/Footer';
import Layout from './components/Layout';

function App() {
  return (
      <Router>
        <div>
          <Header />
          <NavigationBar />
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
            </Switch>
          </Layout>
          <Footer />
        </div>
      </Router>
  );
}

// function Home() {
//   return <h2>Home</h2>;
// }

function About() {
  return <h2>About</h2>;
}

export default App;
