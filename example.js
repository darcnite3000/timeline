var viewport = document.getElementById('viewport');
var timeline = buildTimeline(viewport,1000,['step1','step2','step3'])
  .addEventListener('step2', function(step, index){
    //this === timeline
    this.stop('default').start(10,2);
  })
  .start(50);

setTimeout(function(){
  console.log(timeline.getCurrent());
  if(timeline.getCurrent() === 4) timeline.reset();
}, 1500)