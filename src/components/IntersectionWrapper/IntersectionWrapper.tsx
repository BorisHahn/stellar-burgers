import React, { FC, ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

interface IIntersectionWrapperProps {
  name: string;
  children?: ReactNode;
  onChange: (arg: boolean) => void;
  threshold?: number;
}

const IntersectionWrapper: FC<IIntersectionWrapperProps> = ({
  name,
  children,
  onChange,
  threshold = 0,
}) => {
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
