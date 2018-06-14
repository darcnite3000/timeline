function buildTimeline(viewport,interval,timelineList,looping=false){
  var current, timer, listeners = [];
  var timeline = {
    start, stop, reset,
    addStepListener,
    getCurrent,
  };
  function isConfigured(index){
    return typeof timelineList[index] == "string";
  }
  function getStepDuration(index=0){
    if(isConfigured(index)){
      return interval;
    }else{
      return timelineList[index].dur;
    }
  }
  function getStepName(index){
    if(isConfigured(index)){
      return timelineList[index];
    }else{
      return timelineList[index].step;
    }
  }
  function hasStepCallback(index){
    if(isConfigured(index)){
      return false;
    }else{
      return timelineList[index].cb;
    }
  }

  function increment(){
    var next = current + 1;
    if(looping) next = next >= timelineList.length ? 0 : next;
    if(next < timelineList.length){
      var stepName = getStepName(next);
      viewport.className = (next === 0) ? stepName : `${viewport.className} ${stepName}`;
      current = next;
      setTimer(getStepDuration(current));
    }
  }

  function trigger(step,index){
    var cb = null;
    if(cb = hasStepCallback(index)) cb.apply(timeline,arguments);
    for (var i = listeners.length - 1; i >= 0; i--) {
      if(listeners[i].step === step) listeners[i].cb.apply(timeline, arguments);
    };
  }

  function startTimer(index){
    reset(index);
    setTimer(getStepDuration(index));
  }

  function setTimer(duration=interval){
    clearTimeout(timer);
    timer = setTimeout(increment,duration);
    trigger(getStepName(current), current);
  }

  function getCurrent(){
    return current;
  }

  function reset(index=0){
    current = index >= timelineList.length ? 0 : index;
    stop(getStepName(current));
    return timeline;
  }

  function stop(className){
    if(className) viewport.className = className;
    clearTimeout(timer);
    return timeline;
  }

  function start(delay=0, index){
    if(delay){
      setTimeout(startTimer, delay, index);
    }else{
      startTimer(index);
    }
    return timeline;
  }

  function addStepListener(step, cb){
    listeners.push({step,cb});
    return timeline;
  }

  return timeline;
}