var canvas,preloader,imagenes;
imagenes = ["imgs/0.jpg","imgs/1.jpg","imgs/2.jpg","imgs/3.jpg","imgs/4.jpg","imgs/5.jpg","imgs/6.jpg","imgs/7.jpg","imgs/8.jpg","imgs/9.jpg","imgs/10.jpg","imgs/11.jpg"];
$(document).on("ready",iniciarApp);
function iniciarApp()
{
	canvas = document.getElementById('miCanvas');
	$("#miCanvas").css({
		'top':($('html').height()-canvas.height)/2+'px',
		'left':($('html').width()-canvas.width)/2+'px'
	});
	$("#porcentaje").css({
		'top':($('html').height()-$("#porcentaje").height())/2+'px',
		'left':($('html').width()-$("#porcentaje").width())/2+'px'
	});
	preloader = new PreloadJS();
	preloader.onFileLoad = cargaCompleta;
	preloader.onProgress = progresoCarga;
	prepararCanvas();
}
function prepararCanvas()
{
	var ctx = canvas.getContext('2d');
	var radio = 98;
	var posX = radio +2;
	var posY = radio +2;
	ctx.arc(posX,posY,radio,0,2 * Math.PI, false);
	ctx.strokeStyle= "gray";
	ctx.lineWidth= 4;
	ctx.stroke();
	cargar();
}
function cargar()
{
	while(imagenes.length > 0)
	{
		var imagen = imagenes.shift();
		preloader.loadFile(imagen);	
	}
}
function progresoCarga()
{
	var ctx = canvas.getContext('2d');
	ctx.beginPath();
	var radio= 98;
	var posX = radio +2;
	var posY = radio +2;
	var endAngle = (preloader.progress * (2*Math.PI));
	ctx.arc(posX,posY,radio,0,endAngle, false);
	ctx.strokeStyle = "black";
	ctx.lineWidth = 4;
	ctx.stroke();
	var progresoEntero = parseInt(preloader.progress*100);
	$("#porcentaje").text(progresoEntero+"%");
	if(preloader.progress == 1)
	{
		$("#preloader").remove();
		$("#wrapper").fadeIn();
	}
}
function cargaCompleta(event)
{
	$("#wrapper").append("<img src='"+event.src+"'>");
	
}