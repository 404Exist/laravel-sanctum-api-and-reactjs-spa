import React , { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Navbar from './Navbar';
import Routes from './routes';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <Navbar />
            <div className="mt-4">
                <Routes />
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
