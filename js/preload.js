/**
 * Created by alexander on 23.02.16.
 */
function preloadImages(images,callback){
    if(images instanceof Array){
        var total = images.length, loaded = 0;
      for(var key in images){
          var imgs = new Image();
          imgs.src = images[key];
          imgs.onload = function (){
              loaded++;
              if(loaded == total){
                  callback();
              }
          };
      }
    }
    if(images instanceof String){
        var imgs = new Image();
        imgs.src = images;
        imgs.onload = callback;
    }
}

function preloadSounds(sounds, callback){
    if(sounds instanceof Array){
        var total = sounds.length, loaded = 0;
        for(var key in sounds){
            var sds = new Audio();
            sds.src = sounds[key];
            sds.load();
            sds.onloadeddata = function (){
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