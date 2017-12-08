import React from 'react';

function TrackForm(props) {
   return (
      <form onSubmit={props.onSubmit}>
         <label>
            Track id:
            <input type="text" name="trackId" value={props.trackId} onChange={props.onChange}/>
         </label>
         <input type="submit" id="track" value="Track"/>
      </form>
   );
}

export default TrackForm