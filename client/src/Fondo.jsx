import React, { useEffect, useRef } from "react";

const Fondo = () => {
  const canvasRef = useRef(null);
  const glRef = useRef(null);
  const startTimeRef = useRef(new Date().getTime());
  const currentTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    glRef.current = gl;

    // Redimensionar el canvas para llenar la ventana
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, window.innerWidth, window.innerHeight);
    };

    // Inicializar WebGL y shaders
    const initWebGL = () => {
      const vertexShaderSource = `
        attribute vec2 a_position;
        void main() {
          gl_Position = vec4(a_position, 0, 1);
        }
      `;

      const fragmentShaderSource = `
        #ifdef GL_ES
        precision mediump float;
        #endif

        uniform vec2 u_resolution;
        uniform float u_time;

        void main() {
          vec2 st = gl_FragCoord.xy/u_resolution.xy;
          st.x *= u_resolution.x/u_resolution.y;

          vec3 color = vec3(0.);
          color = vec3(st.x, st.y, abs(sin(u_time)));

          gl_FragColor = vec4(color, 1.0);
        }
      `;

      const vertexShader = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vertexShader, vertexShaderSource);
      gl.compileShader(vertexShader);

      const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fragmentShader, fragmentShaderSource);
      gl.compileShader(fragmentShader);

      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      gl.useProgram(program);

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
          -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0,
        ]),
        gl.STATIC_DRAW
      );

      const positionLocation = gl.getAttribLocation(program, "a_position");
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      const locationOfResolution = gl.getUniformLocation(
        program,
        "u_resolution"
      );
      const locationOfTime = gl.getUniformLocation(program, "u_time");

      gl.uniform2f(locationOfResolution, canvas.width, canvas.height);
      gl.uniform1f(locationOfTime, currentTimeRef.current);

      // Iniciar el bucle de animación
      render();
    };

    const render = () => {
      const gl = glRef.current;

      const now = new Date().getTime();
      currentTimeRef.current = (now - startTimeRef.current) / 1000;

      gl.uniform1f(
        gl.getUniformLocation(gl.program, "u_time"),
        currentTimeRef.current
      );

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      requestAnimationFrame(render);
    };

    window.addEventListener("resize", resizeCanvas);

    resizeCanvas();
    initWebGL();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
};

export default Fondo;
