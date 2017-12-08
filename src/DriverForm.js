import React from 'react';

function DriverForm(props) {
   return (
      <form onSubmit={props.onSubmit}>
         <label>
            Driver id:
            <input type="text" name="driverId" value={props.driverId} onChange={props.onChange}/>
         </label>
         <input type="submit" id="driver" value="Driver"/>
      </form>
   );
}

export default DriverForm