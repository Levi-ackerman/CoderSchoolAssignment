export const delay = (function(){
  let timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

export const getKey = (params) => `location=${params.location}&term=${params.term}&categories=${params.categories}&open_now=${params.openNow}`;
