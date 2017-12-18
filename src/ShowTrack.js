import React from 'react';

function ShowTrack(props) {
   return (
      <div>
         <h3>Track</h3>
         <table>
            <tbody>
            <tr>
               <td><strong>Name</strong></td>
               <td>{props.json.name}</td>
            </tr>
            <tr>
               <td><strong>Id</strong></td>
               <td>{props.json.id}</td>
            </tr>
            </tbody>
         </table>
      </div>
   );
}

export default ShowTrack