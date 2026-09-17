(() => {
  'use strict';
  const existing=document.querySelector('#advancedEye');
  if(existing) existing.remove();
  const script=document.createElement('script');
  script.src='./advanced-eye-real.js?v=20260917-real4';
  script.async=false;
  document.head.appendChild(script);
})();