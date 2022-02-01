import React from 'react';

const Toc = ({ toc }) => {
  return <div className='toc' dangerouslySetInnerHTML={{ __html: toc }}></div >;
};

export default Toc;
