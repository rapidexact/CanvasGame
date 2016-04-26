/**
 * Created by alexander on 23.02.16.
 */
function preloadImages(images,callback){
    var imgs;
    if(images instanceof Array){
        var total = images.length, loaded = 0;
        imgs =[];
      for(var key in images){
          imgs.push(new Image());
          imgs[key].src = images[key];
          imgs[key].onload = new function (){
              loaded++;
              if(loaded == total){
                  callback();
              }
          };
      }
    }
    if(images instanceof String){
        imgs = new Image();
        imgs.src = images;
        imgs.onload = callback;
    }
}

function preloadSounds(sounds, callback){
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