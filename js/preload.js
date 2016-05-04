/**
 * Created by alexander on 23.02.16.
 */
function preloadImages(images,preloadedImgs,callback){
    preloadedImgs = [];
    if(images instanceof Array){
        var total = images.length, loaded = 0;
      for(var key in images){
          preloadedImgs[key] = new Image();
          preloadedImgs[key].src = images[key];
          preloadedImgs[key].onload = function (){
              loaded++;
              if(loaded == total){
                  callback();
              }
          };
      }
    }
    if(images instanceof String){
        images = new Image();
        images.src = images;
        images.onload = callback;
    }
}

function preloadSounds(sounds, prelaodedSounds , callback){
    if(sounds instanceof Array){
        var total = sounds.length, loaded = 0;
        var sds = [];
        for(var key in sounds){
            sds.push(new Audio());
            sds[key].src = sounds[key];
            sds[key].load();
            sds[key].onloadeddata = new function (){
                loaded++;
                if(loaded == total){
                    callback();
                }
            };
        }
    }
    if(sounds instanceof String){
        var sds = new Audio();
        sds.src = sounds;
        sds.load();
        sds.onloadeddata = callback;
    }
}