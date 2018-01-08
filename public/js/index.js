var io = io();
var picasso = _('picasso');
var ctx     = picasso.getContext('2d');
var peerId ;
var width = picasso.width;
var height = picasso.height;

navigator.getUserMedia = navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia;


io.on('welcome',function(data){
    console.log(data.data);
    peerId = data.data.split(':')[1];
    io.emit('server',{data:'server:'+peerId});
});

$(document).ready(function(){
    console.log("app ready to use!!");
    if(navigator.getUserMedia){
        navigator.getUserMedia(
            {video:true,audio:true},

            function(stream){ 
                _('myvideo').src = window.URL.createObjectURL(stream);
                _('myvideo').volume = 0;
                _('myvideo').play();
            },

            function(){ console.log("failed!!");}
        );
    }
    else alert("browser not supporting webRTC");
    
    setInterval(function(){
        if(_('myvideo').paused===false){
            updateCanvas();
        }
    },200);     
});

var counter = 0;
var idata;
var mage;

function updateCanvas(){
    ctx.drawImage(_('myvideo'),0,0,picasso.width,picasso.height);
    // enables jpeg compression, fastens transmission of frames
    idata = picasso.toDataURL('image/jpeg',0.7);
    recimage(idata);
    io.emit('idata',{ data:idata });
    counter++;
    //console.log("sending "+counter+" frame");
}

function recimage(idata){
    mage = new Image();
    mage.src = idata;
    mage.onload = function(){
        _('picasso2').getContext('2d').fillStyle = 'yellow';
        _('picasso2').getContext('2d').fillRect(0,0,width,height);
        _('picasso2').getContext('2d').drawImage(mage,0,0);  
    }
}

function _(el){
    return document.getElementById(el);
}
