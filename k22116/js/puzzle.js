'use strict';
window.onload=function(){
  var size=4;
  var shuffleCount;
  var panels;
  var isShuffled;
  let startTime; 
  let timeoutId;
  var table=document.getElementById("table");
  var msgBox=document.getElementById("msgBox");
  var startBt=document.getElementById("startBt");
  const time = document.getElementById("time");


  function init(){
    shuffleCount=size*1000;
    isShuffled=false;
    panels=[];
    clearTimeout(timeoutId);
    time.textContent = "00:00";
    table.textContent=null;
    msgBox.textContent=null;
    createStage();
    
  }

  function createStage(){
    for(var i=0;i<size;i++){
      var tr=document.createElement("tr");
      for(var j=0;j<size;j++){
        var td=document.createElement("td");
        var index=i*size+j;
        td.posId=index;
        td.textContent=index==size*size-1 ? "":index+1;
        td.onclick=click;
        if(index==size*size-1){
          td.classList.add('empty');
        }
        panels.push(td);
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
  }
  startBt.addEventListener("click",function(){
    init();
    shuffle(shuffleCount);
    startTime = Date.now();
    timer();
    for (let i = 0; i < h; i++) {
      data[i] = Array(w).fill(0);
    }
  });

  function shuffle(shuffleCount){
    for(var i=0;i<shuffleCount;i++){
      click({target:{posId:Math.floor(Math.random()*size*size)}});
    }
    isShuffled=true;
  }
  function click(e){
    var pos=e.target.posId;
    if(pos-size>=0 && panels[pos-size].textContent==''){
      swap(pos,pos-size);
    }else if(pos+size <size*size && panels[pos+size].textContent==''){
      swap(pos,pos+size);
    }else if((pos+1) % size != 0 && panels[pos+1].textContent==''){
      swap(pos,pos+1);
    }else if(pos % size !=0 && panels[pos-1].textContent==''){
      swap(pos,pos-1);
    }
  }
  function swap(p1,p2){
    var temp=panels[p1].textContent;
    panels[p1].textContent=panels[p2].textContent;
    panels[p2].textContent=temp;

    panels[p1].classList.add('empty');
    panels[p2].classList.remove('empty');
    check();
  }
  function check(){
    var okCount=0;
    for(var i=0;i<panels.length;i++){
      if(panels[i].posId==parseInt(panels[i].textContent)-1){
        okCount++;
        panels[i].classList.add("ok");
}else{
        panels[i].classList.remove("ok");
      }
    }
    if(isShuffled && okCount===size*size-1){
      msgBox.textContent="クリア！！";
      clearTimeout(timeoutId);
      
      function doSomething() {
        posttweet("マインスイーパーを "+time.textContent+" でクリアしました!");
      }
      
      setTimeout(function() {
        var result1 = confirm("ゲームクリアしました! ツイートしますか?");
        if(result1){
          doSomething();
        } 
      }, 1000);
    }
    return;
  }

  function timer() {
    const d = new Date(Date.now() - startTime);
    const s = String(d.getSeconds()).padStart(2, "0");
    const m = String(d.getMinutes()).padStart(2, "0");
    time.textContent = `${m}:${s}`;
    timeoutId = setTimeout(() => { 
      timer();
    }, 1000);
  }
  init();
};