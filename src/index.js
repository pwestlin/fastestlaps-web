import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'


/* ReactDOM.render(<App />, document.getElementById('root')); */

/*
Array.prototype.groupBy = function (f)
{
  var groups = {};
  this.forEach(function(o) {
    var group = JSON.stringify(f(o));
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });

  return Object.keys(groups).map(function (group) {
    return groups[group];
  });
};
*/

Array.prototype.groupBy = function (f)
{
  let groups = {};
  this.forEach((o) => {
    let group = JSON.stringify(f(o));
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });

  return Object.keys(groups).map((group) => groups[group]);
};

ReactDOM.render((
   <BrowserRouter>
     <App />
   </BrowserRouter>
 ), document.getElementById('root'))
 
registerServiceWorker();
