// webgl_script.js

document.addEventListener('DOMContentLoaded', function () {
    // Get the WebGL rendering context
    var canvas = document.getElementById('myCanvas');
    var gl = canvas.getContext('webgl');
  
    if (!gl) {
      console.log('Unable to initialize WebGL. Your browser may not support it.');
      return;
    }
  
    // Vertex shader program
    // Vertex shader program
    var vsSource = `
    attribute vec4 aVertexPosition;
    uniform vec2 uTranslation; // Translation uniform
    void main(void) {
    gl_Position = aVertexPosition + vec4(uTranslation, 0.0, 0.0);
    }
    `;

  
    // Fragment shader program
    var fsSource = `
          void main(void) {
            gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
          }
        `;
  
    // Initialize shaders
    function initShaderProgram(gl, vsSource, fsSource) {
        function loadShader(type, source) {
          const shader = gl.createShader(type);
          gl.shaderSource(shader, source);
          gl.compileShader(shader);
      
          if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error(`Shader compilation error: ${gl.getShaderInfoLog(shader)}`);
            gl.deleteShader(shader);
            return null;
          }
      
          return shader;
        }
      
        const vertexShader = loadShader(gl.VERTEX_SHADER, vsSource);
        const fragmentShader = loadShader(gl.FRAGMENT_SHADER, fsSource);
      
        if (!vertexShader || !fragmentShader) {
          return null;
        }
      
        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
      
        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
          console.error(`Unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram)}`);
          return null;
        }
      
        return shaderProgram;
      }
      
  
    // Create and link shaders
    var shaderProgram = initShaderProgram(gl, vsSource, fsSource);
  
    // Get attribute and uniform locations
    var programInfo = {
      program: shaderProgram,
      attribLocations: { vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition') },
    };
  
    // Buffer data
    var vertices = new Float32Array([
      -0.5, 0.5,
      0.5, 0.5,
      -0.5, -0.5,
      0.5, -0.5,
    ]);
  
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  
    // Set clear color
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
  
    // Clear the canvas
    gl.clear(gl.COLOR_BUFFER_BIT);
  
    // Use the program
    gl.useProgram(programInfo.program);
  
    // Enable the vertex attribute
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  
    // Bind the buffer and point an attribute to the buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 2, gl.FLOAT, false, 0, 0);
    
    // Set the translation (e.g., move the square 0.2 units to the right and 0.1 units up)
    var translationUniformLocation = gl.getUniformLocation(programInfo.program, 'uTranslation');
    gl.uniform2fv(translationUniformLocation, [0.2, 0.5]);


    // Draw the square
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  });
  