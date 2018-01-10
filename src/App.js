import React, {Component} from 'react';
import logo from './header.jpg';
import './App.css';
import {Link, Route, Switch,} from 'react-router-dom';
import {FastestLaptimesPerTrackAndKartType, Laptimes} from "./Laptimes";


const FastestLapTimesPerTrack = (props) => {
  const {laptimes} = props;
  const trackName = laptimes[0].track.name;
  const laptimeList = laptimes.map((laptime) => <LaptimeRow key={laptime.id} laptime={laptime}/>);
  return (
    <div>
      <h2>{trackName}</h2>
      <table>
        <thead>
        <tr>
          <th>time</th>
          <th>kart</th>
          <th>driver</th>
          <th>date</th>
        </tr>
        </thead>
        <tbody>
        {laptimeList}
        </tbody>
      </table>
    </div>
  )
};

const LaptimeRow = (props) => {
  const {laptime} = props;
  return (
    <tr>
      <td>{laptime.time}</td>
      <td>{laptime.kart}</td>
      <td>{laptime.driver.name}</td>
      <td>{laptime.date}</td>
    </tr>
  )
};

const Home = () => {
  console.log("Laptimes", Laptimes);
  const fastestLapTimesPerTrack = FastestLaptimesPerTrackAndKartType.groupBy((laptime) => laptime.track.name).map((laptimes) => {
    console.log("laptime 1", laptimes);
    return <FastestLapTimesPerTrack key={laptimes[0].track.id} laptimes={laptimes}/>
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
