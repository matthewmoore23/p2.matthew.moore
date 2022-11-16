

//Time related variables
let clock;
let sec = 0;
let min = 0;
let hr = 0;
let strSec;
let strMin;
let strHour;

let tx = 1235;
let ty = 50;
let tw = 330;
let th = 175;

//weather related variables
let weather;
let url = 'https://api.openweathermap.org/data/2.5/weather?lat=33.5779&lon=-101.8552&units=imperial&appid=f4c9de25b7b730a9ef5b5cae47c18ae6';
let weatherID;
let weatherIcon;
let weatherIconURL;

let iconX;
let iconY;

//news related variables
let feed;
let news;
let newsUrl = 'news.json';
let results;

let nx = 1235;
let ny = 560;
let nw = 330;
let nh = 330;

//calender related variables
let calUrl = 'calender.json';
let calday;
let cal;
let weekday;

let cx = 1235;
let cy = 240;
let cw = 330;
let ch = 305;

//weight related variables
let wgt;
let wgtUrl = 'weight.json';
let wgtJSON;

let wx = 35;
let wy = 700;
let ww = 330;
let wh = 190;

//dragging (advanced feature) variables + camera
let tempX = 0;
let tempY = 0;

let draggingNews = false;
let hoveringNews = false;

let draggingCal = false;
let hoveringCal = false;

let draggingTime = false;
let hoveringTime = false;

let draggingWeight = false;
let hoveringWeight = false;

let capture;


//Loads all the JSON files
function preload(){
  weather = loadJSON(url);
  news = loadJSON(newsUrl);
  calday = loadJSON(calUrl);
  wgtJSON = loadJSON(wgtUrl);
}


function setup(){
    createCanvas(1600, 900);    
    
    clock = new TimeAndWeather(tx, ty, tw, th);
    feed = new News(nx, ny, nw, nh);
    cal = new Calender(cx, cy, cw, ch);
    wgt = new Weight(wx, wy, ww, wh);
    
    iconX = clock.x + 10;
    iconY = clock.y + 86;
    weatherID = weather.weather[0].icon;
    weekday = calday.day[day()-1].day;
    
    let array = ['https://openweathermap.org/img/wn/', weatherID, '@2x.png'];
    weatherIconURL = join(array, '');
    weatherIcon = createImg(weatherIconURL);
    results = news.totalResults;
    
    capture = createCapture(VIDEO);
    capture.size(1600,900)
    capture.hide();
    
}

function draw(){
  //background(255);
  image(capture, 0, 0, 1600, 900);

  //The classes will start to render
  
  if (mouseX > feed.x1 && mouseX < feed.x1 + feed.w1 && mouseY > feed.y1 && mouseY < feed.y1 + feed.h1){
    hoveringNews = true;
  } else {
    hoveringNews = false; 
  }
  
  if (mouseX > cal.x2 && mouseX < cal.x2 + cal.w2 && mouseY > cal.y2 && mouseY < cal.y2 + cal.h2){
    hoveringCal = true;
  } else {
    hoveringCal = false; 
  }
  
  if (mouseX > clock.x && mouseX < clock.x + clock.w && mouseY > clock.y && mouseY < clock.y + clock.h){
    hoveringTime = true;
  } else {
    hoveringTime = false; 
  }
  
  if (mouseX > wgt.x3 && mouseX < wgt.x3 + wgt.w3 && mouseY > wgt.y3 && mouseY < wgt.y3 + wgt.h3){
    hoveringWeight = true;
  } else {
    hoveringWeight = false; 
  }
  
  feed.render();
  clock.render();
  cal.render();
  wgt.render();
  
  
  //Weather icon is put in draw because it kept drawing way too much inside the TimeAndWeather class for some reason
  weatherIcon.position(clock.x + 10, clock.y + 86);
    
}

function mousePressed(){
  if(hoveringNews == true){
    draggingNews = true;
    tempX = mouseX - feed.x1;
    tempY = mouseY - feed.y1;
  } else if (hoveringCal == true){
    draggingCal = true;
    tempX = mouseX - cal.x2;
    tempY = mouseY - cal.y2;
  } else if (hoveringTime == true){
    draggingTime = true;
    tempX = mouseX - clock.x;
    tempY = mouseY - clock.y;
  } else if (hoveringWeight == true){
    draggingWeight = true;
    tempX = mouseX - wgt.x3;
    tempY = mouseY - wgt.y3;
  }
  
  
  
}

function mouseDragged(){
  if (draggingNews == true){
     feed.x1 = mouseX - tempX;
     feed.y1 = mouseY - tempY;
  } else if (draggingCal == true){
     cal.x2 = mouseX - tempX;
     cal.y2 = mouseY - tempY;
  } else if (draggingTime == true){
     clock.x = mouseX - tempX;
     clock.y = mouseY - tempY;
  } else if (draggingWeight == true){
     wgt.x3 = mouseX - tempX;
     wgt.y3 = mouseY - tempY;
  }
  
  
}

function mouseReleased(){
  tempX = 0;
  tempY = 0;
  draggingNews = false;
  draggingCal = false;
  draggingTime = false;
  draggingWeight = false;
}

class Weight{
  constructor(x3, y3, w3, h3){
    this.x3 = x3;
    this.y3 = y3;
    this.w3 = w3;
    this.h3 = h3;
  }
  
  render(){
    noStroke();
    fill(255, 0, 0, 0);
    rect(this.x3, this.y3, this.w3, this.h3);
    
    fill(255);
    textSize(23);
    text('Past Weeks Weight: ' + wgtJSON.lastWeight + 'lbs', this.x3+160, this.y3+60);
    textSize(30);
    text('Current Weight: ' + wgtJSON.currentWeight + 'lbs', this.x3+160, this.y3+100);
    textSize(23);
    text('Target Weight: ' + wgtJSON.targetWeight + 'lbs', this.x3+160, this.y3+140);

    
  }
  
}


class News{
  
  constructor(x1, y1, w1, h1){
    this.x1 = x1;
    this.y1 = y1;
    this.w1 = w1;
    this.h1 = h1;
  }
  
  render(){
    
    
    noStroke();
    fill(255, 0, 0, 0);
    rect(this.x1, this.y1, this.w1, this.h1);
    
    fill(255);
    textAlign(CENTER);
    
    
    textSize(50);
    text(news.articles[0].source.name, this.x1+170, this.y1+55);
    
    textSize(23);
    text("1. " + news.articles[0].title, this.x1+10, this.y1+80, 320, 330);
    text("2. " + news.articles[1].title, this.x1+10, this.y1+180, 320, 330);    
    
  }
  
}

class Calender{
  constructor(x2, y2, w2, h2){
    this.x2 = x2;
    this.y2 = y2;
    this.w2 = w2;
    this.h2 = h2;
  }
  
  render(){
    noStroke();
    fill(255, 0, 0, 0);
    rect(this.x2, this.y2, this.w2, this.h2);
    
    fill(255);
    textSize(40);
    textAlign(CENTER);
    text(weekday, this.x2+165, this.y2+40);
    
    textSize(30);
    text("9 AM : " + calday.day[day()-1].nineAM, this.x2+165, this.y2+90);
    text("12 PM : " + calday.day[day()-1].twelvePM, this.x2+165, this.y2+140);
    text("3 PM : " + calday.day[day()-1].threePM, this.x2+165, this.y2+190);
    text("6 PM : " + calday.day[day()-1].sixPM, this.x2+165, this.y2+240);
    text("9 PM : " + calday.day[day()-1].ninePM, this.x2+165, this.y2+290);
 
    
  }
  
}

class TimeAndWeather{
  
    constructor(x, y, w, h){

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    render(){
        noStroke();
        fill(255, 0, 0, 0);
        rect(this.x, this.y, this.w, this.h);
        
        //Sets sec to second then converts it to a string to concatenate a 0 infront if it's less than 10
        sec = second();
        strSec = str(sec);
        if(sec < 10) {
            strSec = "0" + str(sec);
        }
            
        
        min = minute();
        strMin = str(min);
        if(min < 10) {
            strMin = "0" + str(min);
        }
        
        
        hr = hour() % 12;
        strHour = str(hr);
        if(hr < 10) {
            strHour = "0" + str(hr);
        }
        
        
        //Clock
        fill(255);
        textSize(55);
        textAlign(CENTER);
        if (hour() / 12 <= 1){
          text(strHour + ":" + strMin + ":" + strSec + " AM", this.x+165, this.y+55);
        } else {
          text(strHour + ":" + strMin + ":" + strSec + " PM", this.x+165, this.y+55); 
        }
        
        //Temperature and description 
        textSize(30);
        text(round(weather.main.temp, 1) + "F, " + weather.weather[0].description, this.x+165, this.y+105);
     
        //Date   
        textSize(40);
        text(month() + "/" + day() + "/" + year(), this.x+195, this.y+155);
        
        
    }

}
