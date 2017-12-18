import React from 'react';
import JSONTree from 'react-json-tree';

const VisaJson = ({json}) => (
   <JSONTree
      data={json}
      hideRoot={true}
      shouldExpandNode={(keyName, data, level) => {
         return true
      }}
      labelRenderer={raw => <strong>{raw}</strong>}
      valueRenderer={raw => <em>{raw}</em>}
   />
);

export default VisaJson