var features = new Map();
features.set("color",["white","white"]);
features.set("wings","butterfly");
features.set("effect","solid");
features.set("eye","happy");
features.set("pattern","none");

setColorButtons("color_grid"); 
setEyeButtons();
setOtherButtons();

updateColor("white");
updateSecondary("white");
updateEye("happy");
updatePattern("none");
updateEffect("solid");
updateWings("butterfly");

document.getElementById("save").addEventListener("click", function() { mergeImages("save"); } );
document.getElementById("new_tab").addEventListener("click", function() { mergeImages("new_tab"); } );
document.getElementById("randomize").addEventListener("click", function() { randomize(); } );
document.getElementById("bg_contrast").addEventListener("click", function() { flip_bg(); } );
light = true;

function randomize() {
  var features = [["dark red", "light red", "dark pink", "light pink", "dark purple", "light purple", "black", "white", "dark blue", "teal", "burple", "yellow", "dark green", "medium green", "lime", "mint", "dark brown", "light brown", "orange", "mustard"],["lash","boy","happy","squint","line","swirl"],["butterfly","diamond","round","square"],["solid", "rainbow", "blink", "fade"],["none", "stripe","zigzag","dot"]];
  var randoms = []

  for (var i = 0; i < features.length; i++) {
    if (i==0) {
      randoms.push(features[i][Math.floor(Math.random()*features[i].length)])
    }
    randoms.push(features[i][Math.floor(Math.random()*features[i].length)]);
  }
  updateColor(randoms[0]);
  updateSecondary(randoms[1]);
  updateEye(randoms[2]);
  updateWings(randoms[3]);
  updateEffect(randoms[4]);
  updatePattern(randoms[5]);
}

function flip_bg() {
  if (!light) {
    document.getElementById("firefly_container").style.backgroundImage = "url('misc_assets/light bg.png'"+")";
  }
  else {
    document.getElementById("firefly_container").style.backgroundImage = "url('misc_assets/dark bg.png'"+")";
  }
  light = !light;
}

function setColorButtons(className) {
var colorNames = ["dark red", "light red", "dark pink", "light pink", "dark purple", "light purple", "black", "white", "dark blue", "teal", "burple", "yellow", "dark green", "medium green", "lime", "mint", "dark brown", "light brown", "orange", "mustard"];
var colorRGBs = [[173, 16, 16], [235, 64, 64], [236, 90, 218], [255, 166, 255], [138, 53, 224], [167, 93, 255], [42, 42, 42], [255, 255, 255], [53, 116, 255], [82, 216, 231], [112, 112, 254], [255, 255, 0], [1, 149, 30], [53, 187, 79], [156, 231, 44], [218, 254, 163], [170, 84, 0], [198, 147, 69], [245, 122, 0], [255, 212, 9]];
for (var i = 0; i < colorNames.length; i++) {
  var b = document.createElement("BUTTON");
  b.className = "color_grid_button";
  b.id = colorNames[i]+"1";
  b.style.backgroundColor = "rgb("+colorRGBs[i].join(",")+")";
  document.getElementById(className+"_1").appendChild(b);
  b.addEventListener("click", function() { updateColor(this.id.substring(0,this.id.length - 1)) } );

  var b2 = document.createElement("BUTTON");
  b2.className = "color_grid_button";
  b2.id = colorNames[i]+"2";
  b2.style.backgroundColor = "rgb("+colorRGBs[i].join(",")+")";
  document.getElementById(className+"_2").appendChild(b2);
  b2.addEventListener("click", function() { updateSecondary(this.id.substring(0,this.id.length - 1)) } );
  }
}

function setEyeButtons() {
var eyeAssets = ["lash","boy","happy","squint","line","swirl"];

for (var i = 0; i < eyeAssets.length; i++) {
  var b = document.createElement("BUTTON");
  b.className = "cell_button";
  b.id = ""+eyeAssets[i];
  b.style.backgroundImage = "url('button_assets/"+eyeAssets[i]+" cell.png'"+")";
  b.addEventListener("click", function() { updateEye(this.id) } );
  document.getElementsByClassName("eye_panel_div")[0].appendChild(b);
  }
}

function setOtherButtons() {
var wings = ["butterfly","diamond","round","square"];
var effects = ["solid", "rainbow", "blink", "fade"];
var patterns = ["none", "stripe","zigzag","dot"];
for (var i = 0; i < 4; i++) {
  var a = document.createElement("BUTTON");
  a.className = "cell_button";
  a.id = ""+wings[i];
  a.style.backgroundImage = "url('button_assets/"+wings[i]+" cell.png'"+")";
  document.getElementsByClassName("other_panel_div")[0].appendChild(a);
  a.addEventListener("click", function() { updateWings(this.id) } );

  var h = document.createElement("BUTTON");
  h.className = "cell_button";
  h.id = ""+effects[i];
  h.style.backgroundImage = "url('button_assets/"+effects[i]+" cell.png'"+")";
  h.addEventListener("click", function() { updateEffect(this.id) } );
  document.getElementsByClassName("other_panel_div")[0].appendChild(h);

  var p = document.createElement("BUTTON");
  p.className = "cell_button";
  p.id = ""+patterns[i];
  p.style.backgroundImage = "url('button_assets/"+patterns[i]+" cell.png'"+")";
  p.addEventListener("click", function() { updatePattern(this.id) } );
  document.getElementsByClassName("other_panel_div")[0].appendChild(p);
  }
}

function updateBorders(buttonId, newButtonId) {
  var oldB = document.getElementById(buttonId);
  var newB = document.getElementById(newButtonId);
  if (oldB != null && newB != null) {
    oldB.style.outline = "none";
    newB.style.outline = "0.3vw solid #FBB148";
    oldB.style.zIndex = 0;
    newB.style.zIndex = 1000;
  }
}

//Functions for color/feature updating below
function updateColor(newColor) {
  updateBorders(features.get("color")[0]+"1",newColor+"1");
  features.set("color",[newColor,features.get("color")[1]]);
  updateAsset("head",0);
  updatePattern(features.get("pattern"));
  updateWings(features.get("wings"));
  updateEffect(features.get("effect"));
}

function updateSecondary(newColor) {
  updateBorders(features.get("color")[1]+"2",newColor+"2");
  features.set("color",[features.get("color")[0],newColor]);
  updateWings(features.get("wings"));
  updateEffect(features.get("effect"));
  updateEye(features.get("eye"));
  updateAsset("antennae",1);
  updateAsset("glow",1);
}

function updateEye(newEye) {
  document.getElementById("eye").src = "firefly_assets/eye/"+newEye+".png";
  document.getElementById("eyeball").src = "firefly_assets/eye/eyeballs/"+features.get("color")[1]+".png";
  if (newEye == "lash" || newEye == "boy") {
    document.getElementById("eyeball").src = "misc_assets/empty.png";
  }
  updateBorders(features.get("eye"),newEye);
  features.set("eye",newEye);
}

function updatePattern(newPattern) {
  if (newPattern == "none") {
    document.getElementById("pattern").src = "misc_assets/empty.png";
  }
  else {
    document.getElementById("pattern").src = "firefly_assets/pattern/"+newPattern+"/"+features.get("color")[0]+".png";
  }
  updateBorders(features.get("pattern"),newPattern);
  features.set("pattern",newPattern);
}

function updateAsset(asset,colorNum) {
  document.getElementById(asset+"").src = "firefly_assets/"+asset+"/"+features.get("color")[colorNum]+".png";
}

function updateWings(newWings) {
  document.getElementById("wing_base").src = "firefly_assets/wings/"+newWings+"/base/"+features.get("color")[0]+".png";
  if (newWings != "square") {
    if (newWings == "diamond") {
      document.getElementById("wing_gradient").src = "firefly_assets/wings/diamond/gradient/"+features.get("color")[0]+".png";
      document.getElementById("wing_base").src = "firefly_assets/wings/diamond/base/"+features.get("color")[1]+".png";
    }
    else {
    document.getElementById("wing_gradient").src = "firefly_assets/wings/"+newWings+"/gradient/"+features.get("color")[1]+".png";
    }
  }
  else {
    document.getElementById("wing_base").src = "firefly_assets/wings/"+newWings+"/"+features.get("color")[0]+".png";
    document.getElementById("wing_gradient").src = "misc_assets/empty.png";
  }
  updateBorders(features.get("wings"),newWings);
  features.set("wings",newWings);
}

function updateEffect(newEffect) {
  document.getElementById("edge").src = "misc_assets/empty.png";
  document.getElementById("abdomen_gradient").src = "misc_assets/empty.png";
  if (newEffect == "blink") {
    document.getElementById("abdomen_base").src = "firefly_assets/abdomen/blink/"+features.get("color")[1]+".png";
  }
  else if (newEffect == "fade") {
    document.getElementById("abdomen_base").src = "firefly_assets/abdomen/fade/base/"+features.get("color")[1]+".png";
    document.getElementById("abdomen_gradient").src = "firefly_assets/abdomen/fade/gradient/"+features.get("color")[0]+".png";
  }
  else {
    document.getElementById("abdomen_base").src = "firefly_assets/abdomen/solid/"+features.get("color")[1]+".png";
    if (newEffect == "rainbow") {
      document.getElementById("edge").src = "firefly_assets/abdomen/rainbow/rainbow.png";
      document.getElementById("abdomen_gradient").src = "firefly_assets/abdomen/rainbow/rainbow glow/"+features.get("color")[1]+".png";
    }
  }
  updateBorders(features.get("effect"),newEffect);
  features.set("effect",newEffect);
}

function mergeImages(type) {
var c=document.getElementById("firefly_canvas");
var ctx=c.getContext("2d");
ctx.clearRect(0, 0, firefly_canvas.width, firefly_canvas.height);
var wing_base = new Image();
var wing_gradient = new Image();
var glow = new Image();
var abdomen_base = new Image();
var edge = new Image();
var abdomen_gradient = new Image();
var head = new Image();
var eyeball = new Image();
var eye = new Image();
var antennae = new Image();
var pattern = new Image();
var spot = new Image();
var watermark = new Image();

wing_base.src = document.getElementById("wing_base").src;
wing_base.onload = function() {
ctx.drawImage(wing_base,0,0);
wing_gradient.src = document.getElementById("wing_gradient").src;
wing_gradient.onload = function() {
ctx.drawImage(wing_gradient,0,0);
wing_gradient.src = document.getElementById("glow").src;
glow.onload = function() {
ctx.drawImage(glow,0,0);
abdomen_base.src = document.getElementById("abdomen_base").src;
abdomen_base.onload = function() {
ctx.drawImage(abdomen_base,0,0);
edge.src = document.getElementById("edge").src;
edge.onload = function() {
ctx.drawImage(edge,0,0);
abdomen_gradient.src = document.getElementById("abdomen_gradient").src;
abdomen_gradient.onload = function() {
ctx.drawImage(abdomen_gradient,0,0);
head.src = document.getElementById("head").src;
head.onload = function() {
ctx.drawImage(head,0,0);
eyeball.src = document.getElementById("eyeball").src;
eyeball.onload = function() {
ctx.drawImage(eyeball,0,0);
eye.src = document.getElementById("eye").src;
eye.onload = function() {
ctx.drawImage(eye,0,0);
antennae.src = document.getElementById("antennae").src;
antennae.onload = function() {
ctx.drawImage(antennae,0,0);
pattern.src = document.getElementById("pattern").src;
pattern.onload = function() {
ctx.drawImage(pattern,0,0);
spot.src = document.getElementById("spot").src;
spot.onload = function() {
ctx.drawImage(spot,0,0);
watermark.src = document.getElementById("watermark").src;
watermark.onload = function() {

var image = firefly_canvas.toDataURL("image/png");
if (type == "new_tab") { 
  var newTab = window.open();
  newTab.document.write('<img src="'+image+'" width="757" height="670"/>');
}
else { 
var a  = document.createElement('a');
a.href = image;
a.download = "firefly.png"; 
a.click();
}

}
}
}
}
}
}
}
}
}
}
}
}
}

}