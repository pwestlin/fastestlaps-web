import React from 'react';

function DriversForm(props) {
   let selectItems;
   if(props.drivers) {
      selectItems = Object.entries(props.drivers).map(([key, driver]) => <option key={driver.id} value={driver.id}>{driver.name}</option>);
   }
   return (
      <div>
         {selectItems ?
            <form onSubmit={props.onSubmit} onChange={props.onChange} defaultValue={props.driverId}>
               <label>
                  Drivers:
               </label>
               <select>
                  {selectItems}
               </select>
               {/*<input type="submit" id="driver" value="Driver"/>*/}
            </form>
            : "Loading drivers..."}
      </div>
   );
}

export default DriversForm