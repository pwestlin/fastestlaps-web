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
      };

      this.handleDriverChange = this.handleDriverChange.bind(this);
      this.handleDriverSubmit = this.handleDriverSubmit.bind(this);

      this.handleTrackChange = this.handleTrackChange.bind(this);
      this.handleTrackSubmit = this.handleTrackSubmit.bind(this);

      this.fetchDriver = this.fetchDriver.bind(this);

      this.checkFetchResponseStatus = this.checkFetchResponseStatus.bind(this);

      this.showAlert = this.showAlert.bind(this);
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
      return (
         <div className="App">
            <header />
            <div>
            <DriverForm driverId={this.state.driverId} onSubmit={this.handleDriverSubmit}
                        onChange={this.handleDriverChange}/>
            <TrackForm trackId={this.state.trackId} onSubmit={this.handleTrackSubmit}
                       onChange={this.handleTrackChange}/>
            </div>
            {this.state.json !== undefined &&
               <div>
            <VisaJson json={this.state.json}/>
               </div>
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
