import React from 'react';

function DriverForm(props) {
   return (
      <form onSubmit={props.onSubmit}>
         <label>
            Driver id:
            <input type="text" name="driverId" value={props.driverId} onChange={props.onChange}/>
         </label>
         <button type="submit"/>
      </form>
   );
}

export default DriverForm