var io = new RocketIO().connect(linda_url);
var linda = new Linda(io);
var ts = new linda.TupleSpace(space);

io.on("connect", function(){
  ts.watch(["sensor", "light"], function(tuple){
    if(typeof tuple === "undefined" || tuple === null) return;
    if(tuple.length !== 3) return;
    console.log(tuple);
    var light = tuple[2];
    var color = $.Color(light, light, light);
    $("body").css("background-color", color);
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
