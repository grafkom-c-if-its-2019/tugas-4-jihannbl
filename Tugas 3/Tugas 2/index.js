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
    var vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex);

    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    
    var program = glUtils.createProgram(gl, vertexShader, fragmentShader);
    var program2 = glUtils.createProgram(gl, vertexShader2, fragmentShader);

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

    function kiri() {
      var line1 = new Float32Array([
        -0.5, -0.4,    0.8, 0.0, 0.4,
        -0.5, +0.7,    0.0431, 0.5804, 0.5529
        
      ]);
      var line2 = new Float32Array([
        -0.4, +0.7,   0.0431, 0.5804, 0.5529,
        -0.4, -0.4,   0.8, 0.0, 0.4
      ]);

      var vertices = [],
      vertices2 = [],
      vertices3 = [],
      vertices4 = [];
        //setengah lingkaran atas
      for (var x=-90.0; x<=90.0; x+=1) {
        // degrees to radians
        var z = x * Math.PI / 180;
        
        var vert1 = [
          -0.45 + Math.sin(z)*0.05,
          0.7 + Math.cos(z)*0.1,     0.0431, 0.5804, 0.5529
        ];
        vertices = vertices.concat(vert1);
      }

      //setengah lingkaran bawah 
      for (var y=90; y<=270; y+=1) {
        // degrees to radians
        var w = y * Math.PI / 180;
        
        var vert2 = [
          -0.65 + Math.sin(w)*0.15,
          -0.4 + Math.cos(w)*0.17,     0.8, 0.0, 0.4, 
        ];

        var vert3 = [
          -0.65 + Math.sin(w)*0.25,
          -0.4 + Math.cos(w)*0.33,    0.8, 0.0, 0.4,
        ];
        
        vertices2 = vertices2.concat(vert2);
        vertices3 = vertices3.concat(vert3);
      }

      //setengah lingkaran samping
      for (var x=-90.0; x<=90.0; x+=1) {
        // degrees to radians
        var z = x * Math.PI / 180;
      
        var vert4 = [
          -0.85 + Math.sin(z)*0.05,
          -0.4 + Math.cos(z)*0.09,     0.8, 0.0, 0.4
        ];
        vertices4 = vertices4.concat(vert4);
      }

      drawShapes(gl.LINE_STRIP, line1, 2);
      drawShapes(gl.LINE_STRIP, line2, 2);
      drawShapes(gl.LINE_STRIP, vertices, 181);
      drawShapes(gl.LINE_STRIP, vertices2, 181);
      drawShapes(gl.LINE_STRIP, vertices3, 181);
      drawShapes(gl.LINE_STRIP, vertices4, 181);
    }
    
    function kanan() {
      var line3 = new Float32Array([
        0.7, -0.4,    0.8, 0.0, 0.4,
        0.6, +0.7,    0.0431, 0.5804, 0.5529,
        0.6, -0.4,    0.8, 0.0, 0.4,
        0.7, +0.7,    0.0431, 0.5804, 0.5529,
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
          0.7 + Math.cos(z)*0.1,      0.0431, 0.5804, 0.5529
        ];
  
        var vert6 = [
          0.65 + Math.sin(z)*0,
          0.7 + Math.cos(z)*0,       0.0431, 0.5804, 0.5529
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
    
    var translation = gl.getUniformLocation(program, 'translation');
    var translationVector = [0.0, -0.5, 0.0];
    gl.uniform3fv(translation, translationVector);
  
    var thetaLocation = gl.getUniformLocation(program, 'theta');
    var theta = 0.0; 

    function render(){
        // Bersihkan layar jadi hitam
        gl.useProgram(program);
        gl.clearColor(0.9137, 0.7137, 0.651, 1.0);
    
        // Bersihkan buffernya canvas
        gl.clear(gl.COLOR_BUFFER_BIT);

        theta += 0.0034;
        gl.uniform1f(thetaLocation, theta);
        kiri();
        requestAnimationFrame(render);
    }

    var scaleXLocation = gl.getUniformLocation(program2, 'scaleX');
    var scaleX = 1.0;
    var melebar = 1;  

    function render2(){
      gl.useProgram(program2);

      if (scaleX >= 1) melebar = -1;
      else if (scaleX <= -1) melebar = 1; 
      scaleX += 0.0034 * melebar;
      gl.uniform1f(scaleXLocation, scaleX);
      kanan();
      requestAnimationFrame(render2);
    }
    resizer();
    render();
    render2();
  }

})(window || this);