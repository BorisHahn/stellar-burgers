import React from 'react';
import { useInView } from 'react-intersection-observer';

const IntersectionWrapper = ({ children, onChange, threshold = 0 }) => {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold,
  });

  React.useEffect(() => {
    if (typeof onChange === 'function') {
      onChange(inView === true);
    }
  }, [inView]);

  return <div ref={ref}>{children}</div>;
};

export default IntersectionWrapper;
