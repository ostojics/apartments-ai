import {useEffect, useState} from 'react';

/**
 * Default breakpoint for mobile devices (in px).
 */
const MOBILE_BREAKPOINT = 768;
/**
 * Default breakpoint for tablet devices (in px).
 */
export const TABLET_BREAKPOINT = 1024;

/**
 * Custom React hook to determine if the current viewport width is below the given breakpoint.
 * Returns true if the viewport is considered mobile.
 *
 * @param breakpoint - The max-width breakpoint in px (default: MOBILE_BREAKPOINT)
 * @returns {boolean} True if viewport width is less than the breakpoint, otherwise false.
 */
export function useIsMobile(breakpoint: number = MOBILE_BREAKPOINT) {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    mql.addEventListener('change', onChange);
    setIsMobile(window.innerWidth < breakpoint);
    return () => mql.removeEventListener('change', onChange);
  }, [breakpoint]);

  return !!isMobile;
}
