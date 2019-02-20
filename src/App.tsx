import React, { Component } from 'react';
import axios from 'axios';
import { PlaceholderFallback, Placeholders } from 'react-placeholder-fallback'
import logo from './logo.svg';
import './App.css';
import 'react-placeholder-fallback/dist/index.css';

const TIMEOUT = 3000;

function getDataFromShortTask() {
  return axios.get<string>('http://localhost:4000/shorttask', {
    timeout: TIMEOUT
  })
}

function getDataFromLongTask() {
  return axios.get<string>('http://localhost:4000/longtask', {
    timeout: TIMEOUT
  })
}

interface IAppState {
  loading: boolean;
  data: string;
}

class App extends Component<object, IAppState> {
  public state = { data: '', loading: true };

  public async componentDidMount() {
    try {
      // const res = await getDataFromShortTask();
      const res = await getDataFromLongTask();

      this.setState({ data: res.data, loading: false });
    }
    catch (err) {
      console.warn(err);
    }
  }

  render() {
    const { loading, data } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div style={{ width: 600, height: 100 }}>
            {loading
              ? (
                <PlaceholderFallback
                  placeholder={Placeholders.TextBlock}
                  timeout={TIMEOUT} />
              ) : data}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
