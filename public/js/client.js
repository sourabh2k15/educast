var io = io();
var peerId ;
var picasso = _('picasso');
var ctx     = picasso.getContext('2d');
var width = picasso.width;
var height = picasso.height;
var mage ;
var imagebuffer = [];

var buflen = 30;

for(var i=0;i<buflen;i++) imagebuffer[i] = 0;

function getzeroes(){
    var zerocount = 0;
    for(var i=0;i<imagebuffer.length;i++) if(imagebuffer[i]==0) zerocount++;
    return zerocount;
}

console.log(getzeroes(imagebuffer));

io.on('welcome',function(data){
    console.log(data.data);
    peerId = data.data.split(':')[1];
    io.emit('welcomeack',{ data: 'hello back from client:'+peerId});
});

var counter = 0;
var initialcount = 0;

io.on('irec',function(data){
        mage = new Image();
        mage.src = data.data;
        mage.onload = function(){
           ctx.drawImage(mage,0,0);
        }
     /*
    if(getzeroes()==0){
        mage = new Image();
        mage.src = data.data;
        mage.onload = function(){
           imagebuffer[9] = mage;
        }
        if(initialcount==0){ playvideo(); initialcount++;}
    }
    else { console.log(getzeroes()); recimage(data.data,counter);}
    
    if(counter==(buflen-1)) counter = 0;
    else if(counter<(buflen-1)) counter++;*/
});

function shiftleft(){
    for(var i=0;i<(buflen-1);i++){
        imagebuffer[i] = imagebuffer[i+1];
    }
}

function playvideo(){
    setInterval(function(){
        ctx.drawImage(imagebuffer[0],0,0);
        shiftleft();    
    },60);
}

function recimage(idata,key){
    mage = new Image();
    mage.src = idata;
    mage.onload = function(){
        imagebuffer[key] = mage;
    }
}

function _(el){
    return  document.getElementById(el);
}