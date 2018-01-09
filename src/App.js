import React, {Component} from 'react';
import logo from './header.jpg';
import './App.css';
import {Link, Route, Switch,} from 'react-router-dom';
import {Laptimes, FastestLaptimesPerTrackAndKartType} from "./Laptimes";


const FastestLapTimesPerTrack = (props) => {
  const {laptime} = props;
  return (
    <div>
      id: {laptime.id}<br/>
      track: {laptime.track.name}<br/>
      kart: {laptime.kart}<br/>
      time: {laptime.time}<br/>
      driver: {laptime.driver.name}<br/>
      date: {laptime.date}<br/>
    </div>
  )
};

const Home = () => {
  console.log("Laptimes", Laptimes);
  const grouped = FastestLaptimesPerTrackAndKartType.groupBy((laptime) => laptime.track.name);
  console.log("grouped", grouped);
  const fastestLapTimesPerTrack = FastestLaptimesPerTrackAndKartType.sort((a, b) => a.track.name.localeCompare(b.track.name)).map((laptime) => {
    console.log("laptime 1", laptime);
    return <FastestLapTimesPerTrack key={laptime.id} laptime={laptime}/>
  });
  return (
    <div>
      <p className="App-intro">
        Show fastest laptimes for every track in the system
      </p>
      {fastestLapTimesPerTrack}
    </div>
  )
};

const About = () => {
  return (
    <div>
      <p className="App-intro">
        About
      </p>
      <div className="Loader"/>
    </div>
  )
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to Karting laptimes</h1>
        </header>
        <div className="Main">
          <div className="Nav">
            <nav>
              <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/about'>About</Link></li>
              </ul>
            </nav>

          </div>
          <div className="Content">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/about" component={About}/>
            </Switch>
          </div>

        </div>
        <footer className="App-footer">
          <p>Created by: Peter Westlin</p>
          <p>Contact information: <a href="mailto:peter.westlin@gmail.com">peter.westlin@gmail.com</a>.</p>
        </footer>
      </div>
    );
  }
}

export default App;
