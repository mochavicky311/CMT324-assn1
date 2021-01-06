var canvas;
var gl;
var points = [];
var colors = [];

var NumTimesToSubdivide = 3;
var speed = 1;

var stop = true;
var time = 0;
var axis = 2;
var theta = [0, 0, 0];
var scale = [1, 1, 1];

window.onload = function init(){
	
	bcolor = [1, 1, 1];
	color1 = [249/255, 180/255, 171/255];
	color2 = [38/255, 78/255, 112/255];
	color3 = [253/255, 235/255, 211/255];
	color4 = [103/255, 145/255, 134/255];
	
    canvas = document.getElementById( "gl-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    var vertices = [
		vec3(0.0000, 0.0000, -0.5),
		vec3(0.0000, 0.4714, 0.1667),
		vec3(-0.4083, -0.2357, 0.1667),
		vec3(0.4083, -0.2357, 0.1667)
	];
	
    divideTetra( vertices[0], vertices[1], vertices[2], vertices[3], NumTimesToSubdivide);

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
    
    vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	
	thetaLoc = gl.getUniformLocation(program, "theta");
	scaleLoc = gl.getUniformLocation(program, "scale");
	gl.uniform3fv(scaleLoc, scale);
	
	//speed
	document.getElementById("speed-range").onchange = function(event) {
		speed = event.srcElement.value;
		//change the number type input also 
		document.getElementById("speed-number").value = speed;
	}
	document.getElementById("speed-number").onchange = function(event) {
		//validation
		if (!document.getElementById("speed-number").checkValidity()) {
			window.alert("The value entered is invalid!")
			document.getElementById("speed-number").value = 1;
		}
		speed = event.srcElement.value;
		//change the range type input also
		document.getElementById("speed-range").value = speed;
	}
	
	//number of subdivision
	document.getElementById("subdivision-range").onchange = function(event) {
		NumTimesToSubdivide = event.srcElement.value;
		
		//change the number type input also
		document.getElementById("subdivision-number").value = NumTimesToSubdivide;	
		
		points = [];
		colors = [];
		divideTetra( vertices[0], vertices[1], vertices[2], vertices[3], NumTimesToSubdivide);
		render();
	}
	document.getElementById("subdivision-number").onchange = function(event) {
		//validation
		if (!document.getElementById("subdivision-number").checkValidity()) {
			window.alert("The value entered is invalid!")
			document.getElementById("subdivision-number").value = 3;
		}
		NumTimesToSubdivide = event.srcElement.value;
		
		//change the range type input also
		document.getElementById("subdivision-range").value = NumTimesToSubdivide;
		points = [];
		colors = [];
		divideTetra(vertices[0], vertices[1], vertices[2], vertices[3], NumTimesToSubdivide);
		render();
	}
	
	//rotation x
	document.getElementById("rotate-x-range").onchange = function(event) {
		theta[0] = event.srcElement.value;
		
		//change the number type input also
		document.getElementById("rotate-x-number").value = theta[0];	
		
		render();
	}
	document.getElementById("rotate-x-number").onchange = function(event) {
		//validation
		if (!document.getElementById("rotate-x-number").checkValidity()) {
			window.alert("The value entered is invalid!")
			document.getElementById("rotate-x-number").value = 0;
		}
		theta[0] = event.srcElement.value;
		
		//change the range type input also
		document.getElementById("rotate-x-range").value = theta[0];

		render();
	}
	//rotation y
	document.getElementById("rotate-y-range").onchange = function(event) {
		theta[1] = event.srcElement.value;
		
		//change the number type input also
		document.getElementById("rotate-y-number").value = theta[1];	
		
		render();
	}
	document.getElementById("rotate-y-number").onchange = function(event) {
		//validation
		if (!document.getElementById("rotate-y-number").checkValidity()) {
			window.alert("The value entered is invalid!")
			document.getElementById("rotate-y-number").value = 0;
		}
		theta[1] = event.srcElement.value;
		
		//change the range type input also
		document.getElementById("rotate-y-range").value = theta[1];

		render();
	}
	//rotation z
	document.getElementById("rotate-z-range").onchange = function(event) {
		theta[2] = event.srcElement.value;
		
		//change the number type input also
		document.getElementById("rotate-z-number").value = theta[2];	
		
		render();
	}
	document.getElementById("rotate-z-number").onchange = function(event) {
		//validation
		if (!document.getElementById("rotate-z-number").checkValidity()) {
			window.alert("The value entered is invalid!")
			document.getElementById("rotate-z-number").value = 0;
		}
		theta[2] = event.srcElement.value;
		
		//change the range type input also
		document.getElementById("rotate-z-range").value = theta[2];

		render();
	}
	
	//scaling x
	document.getElementById("scaling-x-range").onchange = function(event) {
		scale[0] = event.srcElement.value;
		
		//change the number type input also
		document.getElementById("scaling-x-number").value = scale[0];	
		gl.uniform3fv(scaleLoc, scale);
		render();
	}
	document.getElementById("scaling-x-number").onchange = function(event) {
		//validation
		if (!document.getElementById("scaling-x-number").checkValidity()) {
			window.alert("The value entered is invalid!")
			document.getElementById("scaling-x-number").value = 1;
		}
		scale[0] = event.srcElement.value;
		
		//change the range type input also
		document.getElementById("scaling-x-range").value = scale[0];
		gl.uniform3fv(scaleLoc, scale);
		render();
	}
	//scaling y
	document.getElementById("scaling-y-range").onchange = function(event) {
		scale[1] = event.srcElement.value;
		
		//change the number type input also
		document.getElementById("scaling-y-number").value = scale[1];	
		gl.uniform3fv(scaleLoc, scale);
		render();
	}
	document.getElementById("scaling-y-number").onchange = function(event) {
		//validation
		if (!document.getElementById("scaling-y-number").checkValidity()) {
			window.alert("The value entered is invalid!")
			document.getElementById("scaling-y-number").value = 1;
		}
		scale[1] = event.srcElement.value;
		
		//change the range type input also
		document.getElementById("scaling-y-range").value = scale[1];
		gl.uniform3fv(scaleLoc, scale);
		render();
	}
	//scaling z
	document.getElementById("scaling-z-range").onchange = function(event) {
		scale[2] = event.srcElement.value;
		
		//change the number type input also
		document.getElementById("scaling-z-number").value = scale[2];	
		gl.uniform3fv(scaleLoc, scale);
		render();
	}
	document.getElementById("scaling-z-number").onchange = function(event) {
		//validation
		if (!document.getElementById("scaling-z-number").checkValidity()) {
			window.alert("The value entered is invalid!")
			document.getElementById("scaling-z-number").value = 1;
		}
		scale[2] = event.srcElement.value;
		
		//change the range type input also
		document.getElementById("scaling-z-range").value = scale[2];
		gl.uniform3fv(scaleLoc, scale);
		render();
	}	
	
	document.getElementById("reset-transform").onclick = function (event){		
		document.getElementById("rotate-x-range").value = 0;
		document.getElementById("rotate-x-number").value = 0;
		document.getElementById("rotate-y-range").value = 0;
		document.getElementById("rotate-y-number").value = 0;
		document.getElementById("rotate-z-range").value = 0;
		document.getElementById("rotate-z-number").value = 0;
		document.getElementById("scaling-x-range").value = 1;
		document.getElementById("scaling-x-number").value = 1;
		document.getElementById("scaling-y-range").value = 1;
		document.getElementById("scaling-y-number").value = 1;
		document.getElementById("scaling-z-range").value = 1;
		document.getElementById("scaling-z-number").value = 1;
		theta = [0, 0, 0];
		scale = [1, 1, 1];
		gl.uniform3fv(scaleLoc, scale);
		render();
	}
	
	document.getElementById("change").onclick = function (event){		
		gl.clearColor(bcolor[0] ,bcolor[1], bcolor[2], 1.0);
		points = [];
		colors = [];
		divideTetra(vertices[0], vertices[1], vertices[2], vertices[3], NumTimesToSubdivide);
		render();
	}
	
	document.getElementById("start").onclick = function (event){		
		disableInput();
		document.getElementById("reset-transform").click();
		theta = [0, 0, 0];
		scale = [1, 1, 1];
		gl.uniform3fv(scaleLoc, scale);
		render();
		stop = false;
	}
	
	document.getElementById("reset").onclick = function (event){		
		document.getElementById("speed-range").value=1;
		document.getElementById("speed-number").value=1;
		document.getElementById("subdivision-range").value=3;
		document.getElementById("subdivision-number").value=3;
		speed = 1;
		NumTimesToSubdivide = 3;
		bcolor = [1, 1, 1];
		color1 = [249/255, 180/255, 171/255];
		color2 = [38/255, 78/255, 112/255];
		color3 = [253/255, 235/255, 211/255];
		color4 = [103/255, 145/255, 134/255];
		pickr.setColor("#FFFFFF");
		pickr1.setColor("#F9B4AB");
		pickr2.setColor("#264E70");
		pickr3.setColor("#FDEBD3");
		pickr4.setColor("#679186");
		gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
		points = [];
		colors = [];
		divideTetra(vertices[0], vertices[1], vertices[2], vertices[3], NumTimesToSubdivide);
		render();
	}
	
	document.getElementById("stop").onclick = function(event){
		enableInput();
		stop = true;
		time = 0;
		theta = [0, 0, 0];
		scale = [1, 1, 1];
		gl.uniform3fv(scaleLoc, scale);
		
		document.getElementById("gl-canvas").onclick = function(event){
			document.getElementById("start").click();
		};
	}
	
	document.getElementById("gl-canvas").onclick = function(event){
			document.getElementById("start").click();
		};
	
	startAnimation();
    render();
};

function triangle( a, b, c, color )
{
    var baseColors = [
		color1,
		color2,
		color3,
		color4
	];

    colors.push( baseColors[color] );
    points.push( a );
    colors.push( baseColors[color] );
    points.push( b );
    colors.push( baseColors[color] );
    points.push( c );
}

function tetra( a, b, c, d )
{
    triangle( a, c, b, 0 );
    triangle( a, c, d, 1 );
    triangle( a, b, d, 2 );
    triangle( b, c, d, 3 );
}

function divideTetra( a, b, c, d, count )
{
    
    if ( count === 0 ) {
        tetra( a, b, c, d );
    }
    
    else {
        var ab = mix( a, b, 0.5 );
        var ac = mix( a, c, 0.5 );
        var ad = mix( a, d, 0.5 );
        var bc = mix( b, c, 0.5 );
        var bd = mix( b, d, 0.5 );
        var cd = mix( c, d, 0.5 );

        --count;
        
        divideTetra(  a, ab, ac, ad, count );
        divideTetra( ab,  b, bc, bd, count );
        divideTetra( ac, bc,  c, cd, count );
        divideTetra( ad, bd, cd,  d, count );
    }
}

function render()
{
	gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
	gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vColor );
	gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
	gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays( gl.TRIANGLES, 0, points.length );
}

function chgtab(event, tabName) {
	var i, x, tab;
	x = document.getElementsByClassName("console");
	for (i = 0; i < x.length; i++) {
		x[i].style.display = "none";
	}
	
	document.getElementById(tabName).style.display = "block";
	event.currentTarget.className += " selected-tab";
}

function disableInput()
{
	document.getElementById("speed-range").disabled = true;
	document.getElementById("speed-number").disabled = true;
	document.getElementById("subdivision-range").disabled = true;
	document.getElementById("subdivision-number").disabled = true;
	document.getElementById("start").disabled = true;
	document.getElementById("reset").disabled = true;
	document.getElementById("stop").disabled = false;
	document.getElementById("change").disabled = true;
	document.getElementById("transform-tab").disabled = true;
	pickr.disable();
	pickr1.disable();
	pickr2.disable();
	pickr3.disable();
	pickr4.disable();
}

function enableInput()
{
	document.getElementById("speed-range").disabled = false;
	document.getElementById("speed-number").disabled = false;
	document.getElementById("subdivision-range").disabled = false;
	document.getElementById("subdivision-number").disabled = false;
	document.getElementById("start").disabled = false;
	document.getElementById("reset").disabled = false;
	document.getElementById("stop").disabled = true;
	document.getElementById("change").disabled = false;
	document.getElementById("transform-tab").disabled = false;
	pickr.enable();
	pickr1.enable();
	pickr2.enable();
	pickr3.enable();
	pickr4.enable();
}

function startAnimation()
{		
	gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	if(!stop){
		//rotate to the right
		if(time < 90){
			theta[axis] -= 2.0 * speed;
			time = time + 1 * speed;
		}
		//rotate back to original position and rotate to the left
		else if(time >= 90 && time < 270){
			theta[axis] += 2.0 * speed;
			time = time + 1 * speed;
		}
		//rotate back to the original position
		else if(time >= 270 && time < 360){
			theta[axis] -= 2.0 * speed;
			time = time + 1 * speed;
		}
		//scale to appropriate size
		else if(time >= 360 && time < 450){
			scale[0] += 0.01 * speed;
			scale[1] += 0.01 * speed;
			scale[2] += 0.01 * speed;
			gl.uniform3fv(scaleLoc, scale);
			time = time + 1 * speed;
		}
		else{
			time = 0;
			theta = [0, 0, 0];
			scale = [1, 1, 1];
			gl.uniform3fv(scaleLoc, scale);
		}
		
		document.getElementById("gl-canvas").onclick = function(event) {
			document.getElementById("stop").click();
		};

	}
	gl.uniform3fv(thetaLoc, theta);
	gl.drawArrays( gl.TRIANGLES, 0, points.length );
	requestAnimFrame(startAnimation);
}