import React, { useEffect, useRef } from 'react';

const Toc = ({ toc }) => {
  const resizeTimeout = useRef()

  useEffect(() => {
    const getHeaders = (dom) => {
      let headers = dom.querySelectorAll("h1, h2, h3, h4, h5, h6")
      headers = Array.prototype.slice.call(headers)
      headers.shift()
      return headers
    }

    const getAnchors = (dom) => {
      let anchors = dom.querySelectorAll("a")
      return anchors
    }

    const handleScroll = () => {
      const article = document.querySelector('article')
      const headers = getHeaders(article)
      let current_header
      headers.forEach(header => {
        const y = window.pageYOffset + header.getBoundingClientRect().top - 30
        if (window.pageYOffset > y) {
          current_header = header
        }
      });
      if (current_header) {
        const headerIndex = headers.indexOf(current_header)
        if (headerIndex !== -1) {
          const toc = document.querySelector('div.toc')
          const anchors = getAnchors(toc)
          anchors.forEach(anchor => {
            anchor.classList.remove('toc-active')
          })
          anchors[headerIndex].classList.add('toc-active')
        }
      }
    };

    const resizeThrottler = () => {
      if (!resizeTimeout.current) {
        resizeTimeout.current = setTimeout(() => {
          resizeTimeout.current = null;
          handleScroll();
        }, 100)
      }
    }

    window.addEventListener('scroll', resizeThrottler);
    return () => {
      window.removeEventListener('scroll', resizeThrottler); //clean up
    };
  }, []);


  return <div className='toc-wrap'>
    <div className='toc' dangerouslySetInnerHTML={{ __html: toc }}></div >
  </div>
    ;
};

export default Toc;
