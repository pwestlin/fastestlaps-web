import React from 'react';

function TracksForm(props) {
   let selectItems;
   if(props.tracks) {
      selectItems = Object.entries(props.tracks).map(([key, track]) => <option key={track.id} value={track.id}>{track.name}</option>);
   }
   return (
      <div>
         {selectItems ?
            <form onSubmit={props.onSubmit} onChange={props.onChange}>
               <label>
                  Tracks:
               </label>
               <select>
                  {selectItems}
               </select>
               {/*<input type="submit" id="track" value="Track"/>*/}
            </form>
            : "Loading tracks..."}
      </div>
   );
}

export default TracksForm