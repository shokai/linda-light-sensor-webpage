var io = new RocketIO().connect(linda_url);
var linda = new Linda(io);
var ts = new linda.TupleSpace(space);

io.on("connect", function(){
  ts.watch(["sensor", "light"], function(tuple){
    if(typeof tuple === "undefined" || tuple === null) return;
    if(tuple.length !== 3) return;
    console.log(tuple);
    var light = tuple[2]; // 0~1023
    var bg_color = $.Color(light, light, light);
    var font_color = light > 128 ? "#000000" : "#FFFFFF";
    $("body").css("background-color", bg_color).css("color", font_color);
    $("#light").text("tuple = ["+tuple+"]");
  });
});

io.on("connect", function(){
  console.log("RocketIO connect <"+io.session+"> "+io.type);
  $("#status").text("connect <"+io.type+">");
});

io.on("disconnect", function(){
  console.log("RocketIO disconnect..");
  $("#status").text("disconnect");
});

$(function(){
  $("title").text(space+" light");
  $("h1").text(space+" light");
});
