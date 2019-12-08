(function(global) {

  glUtils.SL.init({ callback:function() { main(); } });

  function main() {

    window.addEventListener('resize', resizer);
    function resizer() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }

    // Get canvas element and check if WebGL enabled
    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);

    // Initialize the shaders and program
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    // var vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex);
    var vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex); //kubus
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    
    // var program = glUtils.createProgram(gl, vertexShader, fragmentShader);
    var program = glUtils.createProgram(gl, vertexShader, fragmentShader);
    var program2 = glUtils.createProgram(gl, vertexShader2, fragmentShader); //kubus

    function drawShapes(type,vertices,n){
      
      var triangleVertexBufferObject = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
  
      var vPosition = gl.getAttribLocation(program, 'vPosition');
      var vColor = gl.getAttribLocation(program, 'vColor');
    
      gl.vertexAttribPointer(
        vPosition,  // variabel yang memegang posisi attribute di shader
        2,          // jumlah elemen per atribut
        gl.FLOAT,   // tipe data atribut
        gl.FALSE, 
        5 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap vertex 
        0                                   // offset dari posisi elemen di array
      );
      gl.vertexAttribPointer(
        vColor,
        3,
        gl.FLOAT,
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,
        2 * Float32Array.BYTES_PER_ELEMENT
      );

      gl.enableVertexAttribArray(vPosition);
      gl.enableVertexAttribArray(vColor);
  
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
      gl.drawArrays(type, 0, n);
    }  

    function drawcube(){
      var kubusVertices = [
        //BAWAH
          -0.3,  -0.8,  0.7,      255, 255, 255,          
          0.4,  -0.8,  0.7,       255, 255, 255,          
          0.4,  -0.8,  0.7,       255, 255, 255,          
          0.4,  -0.8,  -0.6,      255, 255, 255,          
          0.4,  -0.8,  -0.6,      255, 255, 255,          
          -0.3,  -0.8,  -0.6,     255, 255, 255,          
          -0.3,  -0.8,  -0.6,     255, 255, 255,          
          -0.3,  -0.8,  0.7,      255, 255, 255,          
          //ATAS
          -0.3,  0.6,  0.7,       255,255, 255,          
          0.4,  0.6,  0.7,        255,255, 255,       
          0.4,  0.6,  0.7,        255,255, 255,         
          0.4,  0.6,  -0.6,      255,255, 255,          
          0.4,  0.6,  -0.6,       255,255, 255,          
          -0.3,  0.6,  -0.6,      255,255, 255,          
          -0.3,  0.6,  -0.6,      255,255, 255,          
          -0.3,  0.6,  0.7,       255,255, 255,          
          //BELAKANG
          -0.3,  -0.8,  0.7,      255,255, 255,            
          -0.3,  0.6,  0.7,       255,255, 255,           
          0.4,  -0.8,  0.7,      255,255, 255,            
          0.4,  0.6,  0.7,        255,255, 255,            
          //DEPAN
          0.4,  -0.8,  -0.6,      255,255, 255,            
          0.4,  0.6,  -0.6,       255,255, 255,           
          -0.3,  -0.8,  -0.6,     255,255, 255,            
          -0.3,  0.6,  -0.6,      255,255, 255             
    ];

    var kubusVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, kubusVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(kubusVertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program2,'vPosition');
    var vColor = gl.getAttribLocation(program2,'vColor');
    gl.vertexAttribPointer(
      vPosition,                          // variable yang memegang posisi atrbute di shader
      3,                                  // jumlah elemen per attribute
      gl.FLOAT,                           // tipe data attribut
      gl.FALSE,                           // default
      6 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap vertex
      0                                   // offset dari posisi elemen di array
    );
    gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE,
      6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);

    gl.enableVertexAttribArray(vPosition);
    gl.enableVertexAttribArray(vColor);
  }


    function kanan() {
      var line3 = new Float32Array([
        0.7, -0.4,    0.8, 0.0, 0.4,
        0.6, +0.5,    0.0431, 0.5804, 0.5529,
        0.6, -0.4,    0.8, 0.0, 0.4,
        0.7, +0.5,    0.0431, 0.5804, 0.5529,
        0.7, -0.4,    0.8, 0.0, 0.4
      ]);
  
      var vertices5 = [],
      vertices6 = [],
      vertices7 = [];

      //setengah lingkaran atas full
      for (var x=90.0; x>=-90.0; x-=1) {
        // degrees to radians
        var z = x * Math.PI / 180;
        
        var vert5 = [
          0.65 + Math.sin(z)*0.05,
          0.5 + Math.cos(z)*0.1,      0.0431, 0.5804, 0.5529
        ];
  
        var vert6 = [
          0.65 + Math.sin(z)*0,
          0.5 + Math.cos(z)*0,       0.0431, 0.5804, 0.5529
        ];
  
        vertices5 = vertices5.concat(vert5);
        vertices5 = vertices5.concat(vert6);
      }
  
      //setengah lingkaran bawah full
      for (var y=90; y<=270; y+=1) {
        // degrees to radians
        var w = y * Math.PI / 180;
        
        var vert7 = [
          0.45 + Math.sin(w)*0.15,
          -0.4 + Math.cos(w)*0.17,     0.8, 0.0, 0.4
        ];
  
        var vert8 = [
          0.45 + Math.sin(w)*0.25,
          -0.4 + Math.cos(w)*0.33,     0.8, 0.0, 0.4
        ];
        
        vertices6 = vertices6.concat(vert7);
        vertices6 = vertices6.concat(vert8);
      }
  
        //setengah lingkaran samping full
        for (var x=-90.0; x<=90.0; x+=1) {
          // degrees to radians
          var z = x * Math.PI / 180;
          var vert9 = [
            0.25 + Math.sin(z)*0.05,
            -0.4 + Math.cos(z)*0.09,     0.8, 0.0, 0.4
          ];
    
          var vert10 = [
            0.25 + Math.sin(z)*0,
            -0.4 + Math.cos(z)*0,      0.8, 0.0, 0.4
          ];
            vertices7 = vertices7.concat(vert9);
            vertices7 = vertices7.concat(vert10);
        }

        drawShapes(gl.TRIANGLE_STRIP, vertices5, 362);
        drawShapes(gl.TRIANGLE_STRIP, vertices6, 362);
        drawShapes(gl.TRIANGLE_STRIP, vertices7, 361);
        drawShapes(gl.TRIANGLE_STRIP, line3, 5);
      }

    // huruf j
    var thetaLoc = gl.getUniformLocation(program, 'theta'); 
    var transLoc = gl.getUniformLocation(program, 'trans');
    var theta = [10, 20, 0];
    var trans = [0, 0, 0]; 
    var X = 0.0080;
    var Y = 0.0090;
    var Z = 0.0130;

    // kubus
    var thetaLocCube = gl.getUniformLocation(program2, 'theta');

    function render(){
      // gl.clearColor(0.9137, 0.7137, 0.651, 1.0);
      // gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clearColor(0.0667, 0.2196, 0.2588, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);

      if(trans[0] >= 0.4*0.7 || trans[0] <= -0.3*0.7){
        X *= -1;
      }
      trans[0] += X;

      if(trans[1] >= 0.6*0.7 || trans[1] <= -0.8*0.7){
        Y *= -1;
      }
      trans[1] += Y;

      if(trans[2] >= 0.7*0.7 || trans[2] <= -0.6*0.7){
        Z *= -1;
      }
      trans[2] += Z;

      gl.uniform3fv(transLoc, trans);

      theta[1] += 0.034;
      gl.uniform3fv(thetaLoc, theta);

      kanan();
      requestAnimationFrame(render);
    }

    function render2(){
      gl.useProgram(program2);
      thetaCube = [10, 10, 0];
      gl.uniform3fv(thetaLocCube, thetaCube);
      drawcube();
      gl.drawArrays(gl.LINES,0,24);

      requestAnimationFrame(render2);
    }

    resizer();
    render();
    render2();
  }

})(window || this);