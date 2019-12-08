(function() {

  glUtils.SL.init({ callback: function() { main(); }});

  
  function main() {
    var thetaSpeed, mmLoc, mm, vmLoc, vm, pmLoc, pm, camera;
    var dcLoc, dc, ddLoc, dd, acLoc, ac, nmLoc;

    var vPosition, vColor, vNormal, vTexCoord;
    var flag, flagUniformLocation, fFlagUniformLocation;

    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);

    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var program = glUtils.createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);
    
  
    var cube = [];
    var cubePoints = [
      [ -0.8, -0.8,  0.8 ],
      [ -0.8,  0.8,  0.8 ],
      [  0.8,  0.8,  0.8 ],
      [  0.8, -0.8,  0.8 ],
      [ -0.8, -0.8, -0.8 ],
      [ -0.8,  0.8, -0.8 ],
      [  0.8,  0.8, -0.8 ],
      [  0.8, -0.8, -0.8 ]
    ];
    var cubeColors = [
      [],
      [1.0, 0.0, 0.0], // merah
      [0.0, 1.0, 0.0], // hijau
      [0.0, 0.0, 1.0], // biru
      [1.0, 1.0, 1.0], // putih
      [1.0, 0.5, 0.0], // oranye
      [1.0, 1.0, 0.0], // kuning
      []
    ];
    var cubeNormals = [
      [],
      [  0.0,  0.0,  1.0 ], // depan
      [  1.0,  0.0,  0.0 ], // kanan
      [  0.0, -1.0,  0.0 ], // bawah
      [  0.0,  0.0, -1.0 ], // belakang
      [ -1.0,  0.0,  0.0 ], // kiri
      [  0.0,  1.0,  0.0 ], // atas
      []
    ];
    function quad(a, b, c, d) {
      var indices = [a, b, c, a, c, d];
      for (var i=0; i < indices.length; i++) {
        for (var j=0; j < 3; j++) {
          cube.push(cubePoints[indices[i]][j]);
        }
        for (var j=0; j < 3; j++) {
          cube.push(cubeColors[a][j]);
        }
        for (var j=0; j < 3; j++) {
          cube.push(-1*cubeNormals[a][j]);
        }
        switch (indices[i]) {
          case a:
            cube.push((a-2)*0.125);
            cube.push(0.0);
            break;
          case b:
            cube.push((a-2)*0.125);
            cube.push(1.0);
            break;
          case c:
            cube.push((a-1)*0.125);
            cube.push(1.0);
            break;
          case d:
            cube.push((a-1)*0.125);
            cube.push(0.0);
            break;
        
          default:
            break;
        }
      }
    }

    quad(2, 3, 7, 6);
    quad(3, 0, 4, 7);
    quad(4, 5, 6, 7);
    quad(5, 4, 0, 1);
    quad(6, 5, 1, 2);

    var dragging, lastx, lasty;
    function onMouseDown(event) {
      var x = event.clientX;
      var y = event.clientY;
      var rect = event.target.getBoundingClientRect();
      if (
        rect.left <= x &&
        rect.right > x &&
        rect.top <= y &&
        rect.bottom > y
      ) {
        dragging = true;
        lastx = x;
        lasty = y;
      }
    }
    function onMouseUp(event) {
      dragging = false;
    }
    function onMouseMove(event) {
      var x = event.clientX;
      var y = event.clientY;
      if (dragging) {
        factor = 10 / canvas.height;
        var dx = factor * (x - lastx);
        var dy = factor * (y - lasty);
  
        glMatrix.mat4.rotateY(mm, mm, dx);
        glMatrix.mat4.rotateX(mm, mm, dy);
      }
      lastx = x;
      lasty = y;
    }
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);

    function gambar(){
    line3 = [
      -0.03, 0.0, 0.0,     0.8, 0.0, 0.4,
      -0.02, +0.4, 0.0,    0.0431, 0.5804, 0.5529,
      -0.12, 0.0, 0.0,     0.8, 0.0, 0.4,
      -0.03, +0.4, 0.0,    0.0431, 0.5804, 0.5529,
      -0.12, +0.4, 0.0,    0.0431, 0.5804, 0.5529,
      -0.12, +0.4, 0.0,    0.0431, 0.5804, 0.5529
    ];

    var vertices5 = [],
    vertices6 = [],
    vertices7 = [];

    //setengah lingkaran atas full
    for (var x=90.0; x>=-90.0; x-=1) {
      // degrees to radians
      var z = x * Math.PI / 180;
      
      var vert5 = [
        -0.075 + Math.sin(z)*0.05,
        0.4 + Math.cos(z)*0.1,      0.0, 0.0431, 0.5804, 0.5529
      ];

      var vert6 = [
        -0.075 + Math.sin(z)*0,
        0.4 + Math.cos(z)*0,       0.0, 0.0431, 0.5804, 0.5529
      ];

      vertices5 = vertices5.concat(vert5);
      vertices5 = vertices5.concat(vert6);
    }

    //setengah lingkaran bawah full
    for (var y=90; y<=270; y+=1) {
      // degrees to radians
      var w = y * Math.PI / 180;
      
      var vert7 = [
        0.125 + Math.sin(w)*0.15,
        0.0 + Math.cos(w)*0.17,     0.0, 0.8, 0.0, 0.4
      ];

      var vert8 = [
        0.125 + Math.sin(w)*0.25,
        0.0 + Math.cos(w)*0.33,     0.0, 0.8, 0.0, 0.4
      ];
      
      vertices6 = vertices6.concat(vert7);
      vertices6 = vertices6.concat(vert8);
    }

      //setengah lingkaran samping full
      for (var x=-90.0; x<=90.0; x+=1) {
        // degrees to radians
        var z = x * Math.PI / 180;
        var vert9 = [
          0.325 + Math.sin(z)*0.05,
          0.0 + Math.cos(z)*0.09,     0.0, 0.8, 0.0, 0.4
        ];
  
        var vert10 = [
          0.325 + Math.sin(z)*0,
          0.0 + Math.cos(z)*0,      0.0, 0.8, 0.0, 0.4
        ];
          vertices7 = vertices7.concat(vert9);
          vertices7 = vertices7.concat(vert10);
      }
      drawShapes(gl.TRIANGLE_STRIP, vertices5, 362);
      drawShapes(gl.TRIANGLE_STRIP, vertices6, 362);
      drawShapes(gl.TRIANGLE_STRIP, vertices7, 361);
      drawShapes(gl.TRIANGLE_STRIP, line3, 6);
    }

    var transLoc = gl.getUniformLocation(program, 'trans');
    var trans = [0, 0, 0]; 
    var X = 0.5;
    var Y = 0.5;
    var Z = 0.5;
    var lbr = 0.5;

    function drawShapes(type, vertices, n) {
      var vertexBufferObject = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);

      var vPosition = gl.getAttribLocation(program, 'vPosition');
      var vColor = gl.getAttribLocation(program, 'vColor');
      gl.vertexAttribPointer(
        vPosition, 
        3,         
        gl.FLOAT,  
        gl.FALSE,
        6 * Float32Array.BYTES_PER_ELEMENT, 
        0
      );
      gl.vertexAttribPointer(
        vColor,
        3,
        gl.FLOAT,
        gl.FALSE,
        6 * Float32Array.BYTES_PER_ELEMENT,
        3 * Float32Array.BYTES_PER_ELEMENT
      );
      gl.enableVertexAttribArray(vPosition);
      gl.enableVertexAttribArray(vColor);

      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

      gl.uniform3fv(transLoc, trans);
      gl.drawArrays(type, 0, n);
    }
  
    function drawCube(type,vertices,n) {
      var vertexcubeBufferObject = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexcubeBufferObject);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  
      vPosition = gl.getAttribLocation(program, 'vPosition');
      vNormal = gl.getAttribLocation(program, 'vNormal');
      vTexCoord = gl.getAttribLocation(program, 'vTexCoord');

      gl.vertexAttribPointer(
        vPosition, 
        3,          
        gl.FLOAT,   
        gl.FALSE,
        11 * Float32Array.BYTES_PER_ELEMENT, 
        0                                    
      );
  
      gl.vertexAttribPointer(
        vNormal,
        3,
        gl.FLOAT,
        gl.FALSE,
        11 * Float32Array.BYTES_PER_ELEMENT,
        6 * Float32Array.BYTES_PER_ELEMENT
      );
  
      gl.vertexAttribPointer(
        vTexCoord,
        2,
        gl.FLOAT,
        gl.FALSE,
        11 * Float32Array.BYTES_PER_ELEMENT,
        9 * Float32Array.BYTES_PER_ELEMENT
      );
  
      gl.enableVertexAttribArray(vPosition);
      gl.enableVertexAttribArray(vNormal);
      gl.enableVertexAttribArray(vTexCoord);
      gl.drawArrays(type, 0, n);
    }

    function render(){
      gl.clearColor(0.0667, 0.2196, 0.2588, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
  
      // Perhitungan modelMatrix untuk vektor normal
      var nm = glMatrix.mat3.create();
      glMatrix.mat3.normalFromMat4(nm, mm);
      gl.uniformMatrix3fv(nmLoc, false, nm);
  
      glMatrix.mat4.lookAt(vm,
        [camera.x, camera.y, camera.z], // di mana posisi kamera (posisi)
        [0.0, 0.0, -2.0], // ke mana kamera menghadap (vektor)
        [0.0, 1.0, 0.0]  // ke mana arah atas kamera (vektor)
      );
      gl.uniformMatrix4fv(vmLoc, false, vm);
   
      gl.uniformMatrix4fv(mmLoc, false, mm);
  
      flag = 0;
      gl.uniform1i(flagUniformLocation, flag);
      gl.uniform1i(fFlagUniformLocation, flag);
      drawCube(gl.TRIANGLES, cube, 30)
  
      gl.disableVertexAttribArray(vNormal);
      gl.disableVertexAttribArray(vTexCoord);
  
      //animasi refleksi
      if (scaleM >= 1.0) lbr = -1.0;
      else if (scaleM <= -1.0) lbr = 1.0;
      
      scaleM += 0.034 * lbr;
      gl.uniform1f(scaleMLoc, scaleM);
        
      if (trans[0] >= (0.7 - Math.abs(0.2 * 0.7 * scaleM))) X = -1.0;
      else if (trans[0] <= (-0.7 + Math.abs(0.2 * 0.7 * scaleM))) X = 1.0;
      trans[0] += 0.009 * X;

      if (trans[1] >= (0.7 - (0.3 * 0.7))) Y = -1.0;
      else if (trans[1] <= (-0.7 + (0.3 * 0.7))) Y = 1.0;
      trans[1] += 0.010 * Y;

      if (trans[2] >= (0.7 - Math.abs(0.2 * 0.7 * scaleM))) Z = -1.0;
      else if (trans[2] <= (-0.7 + Math.abs(0.2 * 0.7 * scaleM))) Z = 1.0;
      trans[2] += 0.011 * Z;

      dd = glMatrix.vec3.fromValues(trans[0], trans[1], trans[2]);  // xyz
      gl.uniform3fv(ddLoc, dd);

      flag = 1;
      gl.uniform1i(flagUniformLocation, flag);
      gl.uniform1i(fFlagUniformLocation, flag);
      gambar()

      gl.disableVertexAttribArray(vColor);
      gl.enable(gl.DEPTH_TEST);
      requestAnimationFrame(render);
    }

    var sampler0Loc = gl.getUniformLocation(program, 'sampler0');
    gl.uniform1i(sampler0Loc, 0);


    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);


    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
                  new Uint8Array([0, 0, 255, 255]));


    var image = new Image();
    image.src = "images/txStainglass.bmp";
    image.addEventListener('load', function() {

      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.generateMipmap(gl.TEXTURE_2D);
    });

    theta = 0;
    thetaSpeed = 0.0;

    mmLoc = gl.getUniformLocation(program, 'modelMatrix');
    mm = glMatrix.mat4.create();
    glMatrix.mat4.translate(mm, mm, [0.0, 0.0, -2.0]);

    vmLoc = gl.getUniformLocation(program, 'viewMatrix');
    vm = glMatrix.mat4.create();
    pmLoc = gl.getUniformLocation(program, 'projectionMatrix');
    pm = glMatrix.mat4.create();

    camera = {x: 0.0, y: 0.0, z:0.0};
    glMatrix.mat4.perspective(pm,
      glMatrix.glMatrix.toRadian(90), 
      canvas.width/canvas.height,    
      0.5, 
      10.0, 
    );
    gl.uniformMatrix4fv(pmLoc, false, pm);
    
    scaleMLoc = gl.getUniformLocation(program, 'scaleM');
    scaleM = 1.0;
    gl.uniform1f(scaleMLoc, scaleM);

    flagUniformLocation = gl.getUniformLocation(program, 'flag');
    flag = 0;
    gl.uniform1i(flagUniformLocation, flag);

    fFlagUniformLocation = gl.getUniformLocation(program, 'fFlag');
    gl.uniform1i(fFlagUniformLocation, flag);

    dcLoc = gl.getUniformLocation(program, 'diffuseColor');
    dc = glMatrix.vec3.fromValues(1.0, 1.0, 1.0);  // rgb
    gl.uniform3fv(dcLoc, dc);
    
    ddLoc = gl.getUniformLocation(program, 'diffusePosition');

    acLoc = gl.getUniformLocation(program, 'ambientColor');
    ac = glMatrix.vec3.fromValues(0.17, 0.40, 0.34);
    gl.uniform3fv(acLoc, ac);

    nmLoc = gl.getUniformLocation(program, 'normalMatrix');

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    
    render();
  }

})();