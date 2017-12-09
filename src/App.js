import React, {Component} from 'react';
import './App.css';
import DriverForm from './DriverForm'
import VisaJson from './VisaJson'
import TrackForm from './TrackForm';
import AlertContainer from 'react-alert';

class App extends Component {

   constructor(props) {
      super();

      this.showAlerts = props.showAlerts;
      this.state = {
         // TODO: ints
         driverId: '1',
         trackId: '1',
         drivers: undefined
      };

      this.handleDriverChange2 = this.handleDriverChange.bind(this);
      this.handleDriverSubmit2 = this.handleDriverSubmit.bind(this);

      this.handleTrackChange2 = this.handleTrackChange.bind(this);
      this.handleTrackSubmit2 = this.handleTrackSubmit.bind(this);

      //this.showAlert = this.showAlert.bind(this);
   }

   componentDidMount() {
      this.fetchDrivers("/drivers");
   }

   handleDriverChange(event) {
      this.setState({driverId: event.target.value});
   }

   handleDriverSubmit(event) {
      console.log(`Submit ${this.state.driverId}`);
      this.fetchDriver(this.state.driverId);
      event.preventDefault();
   }

   handleTrackChange(event) {
      this.setState({trackId: event.target.value});
   }

   handleTrackSubmit(event) {
      console.log(`Submit ${this.state.trackId}`);
      this.fetchTrack(this.state.trackId);
      event.preventDefault();
   }

   fetchDriver(driverId) {
      this.fetchEntity("drivers", driverId)
   }

   fetchTrack(trackId) {
      this.fetchEntity("tracks", trackId)
   }

   fetchEntity(entityName, entityId) {
      this.fetchJson(`/${entityName}/${entityId}`)
   }

   fetchJson(url) {
      const that = this;
      fetch(url, {
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
         that.setState({json: body});
         console.log(`Response ${JSON.stringify(body)}`);
      })
         .catch(function (error) {
            if (that.showAlerts) {
               that.showAlert('error', `${error}`, 5000);
            }
            console.log(`Error ${error}`);
            that.setState({json: undefined})
         });
   }

   fetchDrivers(url) {
      const that = this;
      fetch(url, {
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
         that.setState({drivers: body});
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
      let driverListItems = undefined;

      /*
            const listItems = this.state.drivers.map((driver) =>
               <li>${driver.name}</li>
            );
      */
      /*
            for (var i in this.state.drivers) {
               console.log(`this.state.drivers[${i}] = ${JSON.stringify(this.state.drivers[i])}`);
      /!*
               var id = this.state.drivers[i].id;
               var name = this.state.drivers[i].name;
      *!/
            }
            const listItems = this.state.drivers.map((driver) =>
               <li>${driver.name}</li>
            );
      */
      if (this.state.drivers) {
/*
         console.log(`this.state.driver = ${JSON.stringify(this.state.drivers)}`);
         for (const key in this.state.drivers) {
            if (this.state.drivers.hasOwnProperty(key)) {
               console.log(`key = ${key}`);
               console.log(`this.state.drivers[${key}] = ${JSON.stringify(this.state.drivers[key])}`)
            }
         }
         Object.entries(this.state.drivers).forEach(([key, driver]) => console.log(key, driver.id, driver.name));
         Object.entries(this.state.drivers).forEach(([key, driver]) => console.log(driver.id, driver.name));
         Object.entries(this.state.drivers).map(([key, driver]) => console.log(key, driver));
         let drivers = [];
         Object.entries(this.state.drivers).map(([key, driver]) => drivers.push(key, driver));
         console.log(`drivers = ${drivers}`);
         //driverListItems = drivers.map(driver => <li key={driver.id}>{driver.name}</li>);
*/
         driverListItems = Object.entries(this.state.drivers).map(([key, driver]) => <li key={driver.id}>{driver.name}</li>);
         console.log(`driverListItems = ${driverListItems}`)
      }

      return (
         <div className="App">
            <header/>
            <div>
               <DriverForm driverId={this.state.driverId} onSubmit={this.handleDriverSubmit2}
                           onChange={this.handleDriverChange2}/>
               <TrackForm trackId={this.state.trackId} onSubmit={this.handleTrackSubmit2}
                          onChange={this.handleTrackChange2}/>
            </div>
            {this.state.json !== undefined &&
               <div>
                  <VisaJson json={this.state.json}/>
               </div>
            }
            {driverListItems ?
               <div>
                  <ul>{driverListItems}</ul>
               </div>
               : <div>Loading drivers...</div>
            }
            <div>
               <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
            </div>
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
