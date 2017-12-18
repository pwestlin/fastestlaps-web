import React from 'react';

function TrackForm(props) {
   return (
      <form onSubmit={props.onSubmit}>
         <label>Track id:</label>
         <input type="text" name="trackId" value={props.trackId} onChange={props.onChange}/>
         <input type="submit" id="track" value="Track"/>
      </form>
   );
}

export default TrackForm