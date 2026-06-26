export const NAV_VIEWPORT_BREAKPOINT_PX = 1200

export const buildInitNavViewportScript = () =>
  `(function(){try{var m=window.matchMedia('(max-width:${NAV_VIEWPORT_BREAKPOINT_PX - 1}px)').matches;document.documentElement.setAttribute('data-nav-viewport',m?'mobile':'desktop')}catch(e){}})();`
