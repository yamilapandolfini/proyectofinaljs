var elem = document.getElementById('block'),
    fadeInInterval,
    fadeOutInterval;
    
document.getElementById('fade-in').addEventListener('click',function(){
    
clearInterval(fadeInInterval);
clearInterval(fadeOutInterval);

elem.fadeIn = function(timing) {
var newValue = 0;

elem.style.display = 'block';
elem.style.opacity = 0;

fadeInInterval = setInterval(function(){ 

if (newValue < 1) {
newValue += 0.01;
} else if (newValue === 1) {
clearInterval(fadeInInterval);   
}

elem.style.opacity = newValue;

}, timing);

}

elem.fadeIn(10);
});



document.getElementById('fade-out').addEventListener('click',function(){
    
clearInterval(fadeInInterval);
clearInterval(fadeOutInterval);

elem.fadeOut = function(timing) {
var newValue = 1;
elem.style.opacity = 1;

fadeOutInterval = setInterval(function(){ 

if (newValue > 0) {
newValue -= 0.01;
} else if (newValue < 0) {
elem.style.opacity = 0;
elem.style.display = 'none';
clearInterval(fadeOutInterval);
}

elem.style.opacity = newValue;

}, timing);

}

elem.fadeOut(10);
});