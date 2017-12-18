import React, {Component} from 'react';
import './App.css';
import AlertContainer from 'react-alert';
import DriverForm from "./DriverForm";
import TrackForm from "./TrackForm";
import DriversForm from "./DriversForm";
import TracksForm from "./TracksForm";
import ShowDriver from "./ShowDriver";
import ShowTrack from "./ShowTrack";

class App extends Component {

   constructor(props) {
      super();

      this.showAlerts = props.showAlerts;
      this.state = {
         // TODO: ints
         driverId: '1',
         trackId: '1',
         drivers: undefined,
         tracks: undefined,
      };

      this.handleDriverIdChange = this.handleDriverIdChange.bind(this);
      this.handleDriverIdSubmit = this.handleDriverIdSubmit.bind(this);

      this.handleDriverFetched = this.handleDriverFetched.bind(this);

      this.handleTrackIdChange = this.handleTrackIdChange.bind(this);
      this.handleTrackIdSubmit = this.handleTrackIdSubmit.bind(this);

      this.handleTrackFetched = this.handleTrackFetched.bind(this);

      this.handleDriverChange = this.handleDriverChange.bind(this);
      this.handleDriverSubmit = this.handleDriverSubmit.bind(this);

      this.handleTrackChange = this.handleTrackChange.bind(this);
      this.handleTrackSubmit = this.handleTrackSubmit.bind(this);
   }

   componentDidMount() {
      this.fetchDrivers();
      this.fetchTracks();
   }

   handleDriverIdChange(event) {
      this.setState({driverId: event.target.value});
   }

   handleDriverFetched(json) {
      this.setState({driverJson: json});
      this.setState({trackJson: undefined});
   }

   handleTrackFetched(json) {
      this.setState({trackJson: json});
      this.setState({driverJson: undefined});
   }

   handleDriverIdSubmit(event) {
      console.log(`Submit ${this.state.driverId}`);
      this.fetchDriver(this.state.driverId, this.handleDriverFetched);
      event.preventDefault();
   }

   handleTrackIdChange(event) {
      this.setState({trackId: event.target.value});
   }

   handleTrackIdSubmit(event) {
      console.log(`Submit ${this.state.trackId}`);
      this.fetchTrack(this.state.trackId, this.handleTrackFetched);
      event.preventDefault();
   }

   handleDriverChange(event) {
      this.setState({driverId: event.target.value});
      this.fetchDriver(event.target.value, this.handleDriverFetched);
   }

   handleDriverSubmit(event) {
      console.log(`Submit ${this.state.driverId}`);
      event.preventDefault();
   }

   handleTrackChange(event) {
      this.setState({trackId: event.target.value});
      this.fetchTrack(event.target.value, this.handleTrackFetched);
   }

   handleTrackSubmit(event) {
      console.log(`Submit ${this.state.trackId}`);
      event.preventDefault();
   }

   fetchDriver(driverId, handleDriverFetched) {
      this.fetchEntity("drivers", driverId, handleDriverFetched)
   }

   fetchTrack(trackId, handleTrackFetched) {
      this.fetchEntity("tracks", trackId, handleTrackFetched)
   }

   fetchEntity(entityName, entityId, handleJsonFetched) {
      this.fetchJson(`/${entityName}/${entityId}`, handleJsonFetched)
   }

   fetchJson(url, handleJsonFetched) {
      const that = this;
      fetch(url, {
         method: 'GET',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         }
      })
         .then(this.checkFetchResponseStatus)
         .then(response => {
            console.log(`Reply: ${response}`);
            return response.json()
         }).then(body => {
         console.log(`body.id = ${body.id}`);
         console.log(`body.name = ${body.name}`);
         if (that.showAlerts) {
            that.showAlert('success', 'Ok', 1000);
         }
         that.setState({json: body});
         handleJsonFetched(body);
         console.log(`Response ${JSON.stringify(body)}`);
      })
         .catch(error => {
            if (that.showAlerts) {
               that.showAlert('error', `${error}`, 5000);
            }
            console.log(`Error ${error}`);
            that.setState({json: undefined})
         });
   }

   fetchDrivers() {
      const that = this;
      fetch("/drivers", {
         method: 'GET',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         }
      })
         .then(this.checkFetchResponseStatus)
         .then(response => {
            console.log(`Reply: ${response}`);
            return response.json()
         }).then(body => {
         console.log(`body.id = ${body.id}`);
         console.log(`body.name = ${body.name}`);
         if (that.showAlerts) {
            that.showAlert('success', 'Ok', 1000);
         }
         that.setState({drivers: body});
         console.log(`Response ${JSON.stringify(body)}`);
      })
         .catch(error => {
            if (that.showAlerts) {
               that.showAlert('error', `${error}`, 5000);
            }
            console.log(`Error ${error}`);
            return undefined;
         });
   }

   fetchTracks() {
      const that = this;
      fetch("/tracks", {
         method: 'GET',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         }
      })
         .then(this.checkFetchResponseStatus)
         .then(function (response) {
            console.log(`Reply: ${response}`);
            return response.json()
         }).then(function (body) {
         console.log(`body.id = ${body.id}`);
         console.log(`body.name = ${body.name}`);
         if (that.showAlerts) {
            that.showAlert('success', 'Ok', 1000);
         }
         that.setState({tracks: body});
         console.log(`Response ${JSON.stringify(body)}`);
      })
         .catch(function (error) {
            if (that.showAlerts) {
               that.showAlert('error', `${error}`, 5000);
            }
            console.log(`Error ${error}`);
            return undefined;
         });
   }

   checkFetchResponseStatus(response) {
      console.log(`response= ${response}`);
      console.log(`response.status = ${response.status}`);
      if (response.status >= 200 && response.status < 300) {
         return response
      } else {
         response.text().then(function (text) {
               console.log(`Fel: ${text}`);
            }
         );
         const error = new Error(`${response.status}: ${response.statusText}`);
         error.response = response;
         throw error
      }
   }

   render() {
      console.log(`drivers = ${this.state.drivers}`);
      let driverListItems;
      if (this.state.drivers) {
         driverListItems = Object.entries(this.state.drivers).map(([key, driver]) => <li
            key={driver.id}>{driver.name}</li>);
         console.log(`driverListItems = ${driverListItems}`);
         driverListItems = Object.entries(this.state.drivers).map(([key, driver]) => <option
            value={driver.id}>{driver.name}</option>);
         console.log(`driverListItems = ${driverListItems}`);
      }

      return (
         <div className="App">
            <header className="App-header"><h1>Fastest laptimes</h1></header>
            <div className="Content">
               <div className="Nav">
                  <div>
                     <DriverForm
                        driverId={this.state.driverId}
                        onSubmit={this.handleDriverIdSubmit}
                        onChange={this.handleDriverIdChange}
                     />
                     <TrackForm
                        trackId={this.state.trackId}
                        onSubmit={this.handleTrackIdSubmit}
                        onChange={this.handleTrackIdChange}
                     />
                  </div>
                  <div>
                     <DriversForm
                        drivers={this.state.drivers}
                        onSubmit={this.handleDriverSubmit}
                        onChange={this.handleDriverChange}
                        driverId={this.state.driverId}
                     />
                  </div>
                  <div>
                     <TracksForm
                        tracks={this.state.tracks}
                        onSubmit={this.handleTrackSubmit}
                        onChange={this.handleTrackChange}
                        trackId={this.state.trackId}
                     />
                  </div>

               </div>
               <div className="Main">
                  {/*{this.state.json && <VisaJson json={this.state.json}/>}*/}
                  {/*{this.state.json && <ShowDriver json={this.state.json}/>}*/}
                  {this.state.driverJson && <ShowDriver json={this.state.driverJson}/>}
                  {this.state.trackJson && <ShowTrack json={this.state.trackJson}/>}
               </div>
               <div>
                  <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
               </div>
            </div>
            <footer className="App-footer">Copyright &copy; 2017 Peter Westlin</footer>
         </div>

      );
   }

   showAlert = (type, txt, time) => {
      this.msg.show(txt, {
         time: time,
         type: type,
         //			icon: <img src="path/to/some/img/32x32.png" />
      })
   };

   alertOptions = {
      offset: 14,
      position: 'top left',
      theme: 'dark',
      time: 7000,
      transition: 'scale'
   };

}

export default App;
