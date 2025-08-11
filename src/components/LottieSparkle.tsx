import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import sparkle from './lottie/sparkle.json';

export const LottieSparkle: React.FC<{ className?: string }> = ({ className }) => {
  const [hover, setHover] = useState(false);
  useEffect(()=>{},[hover]);
  return (
    <div className={className} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
      <Lottie animationData={sparkle} loop={true} autoplay={hover} />
    </div>
  );
};
