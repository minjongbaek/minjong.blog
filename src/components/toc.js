import React from 'react';

const Toc = ({ toc }) => {
  return <div className='toc-wrap'>
    <div className='toc' dangerouslySetInnerHTML={{ __html: toc }}></div >
  </div>
    ;
};

export default Toc;
