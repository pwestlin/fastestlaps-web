import React from 'react';
import JSONTree from 'react-json-tree';

const VisaJson = ({json}) => (
   <JSONTree
      data={json}
      hideRoot={true}
      shouldExpandNode={(keyName, data, level) => {
         return true
      }}/>
);

export default VisaJson