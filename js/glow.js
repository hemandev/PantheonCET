
(function() {
  var GLSL, error, gl, gui, nogl;

  GLSL = {
    vert: "\n#ifdef GL_ES\nprecision mediump float;\n#endif\n\n// Uniforms\nuniform vec2 u_resolution;\n\n// Attributes\nattribute vec2 a_position;\n\nvoid main() {\n    gl_Position = vec4 (a_position, 0, 1);\n}\n",
    frag: "\n#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform bool u_scanlines;\nuniform vec2 u_resolution;\n\nuniform float u_brightness;\nuniform float u_blobiness;\nuniform float u_particles;\nuniform float u_millis;\nuniform float u_energy;\n\n// http://goo.gl/LrCde\nfloat noise( vec2 co ){\n    return fract( sin( dot( co.xy, vec2( 12.9898, 78.233 ) ) ) * 43758.5453 );\n}\n\nvoid main( void ) {\n\n    vec2 position = ( gl_FragCoord.xy / u_resolution.x );\n    float t = u_millis * 0.001 * u_energy;\n    \n    float a = 0.0;\n    float b = 0.0;\n    float c = 0.0;\n\n    vec2 pos, center = vec2( 0.5, 0.5 * (u_resolution.y / u_resolution.x) );\n    \n    float na, nb, nc, nd, d;\n    float limit = u_particles / 40.0;\n    float step = 1.0 / u_particles;\n    float n = 0.0;\n    \n    for ( float i = 0.0; i <= 1.0; i += 0.025 ) {\n\n        if ( i <= limit ) {\n\n            vec2 np = vec2(n, 1-1);\n            \n            na = noise( np * 1.1 );\n            nb = noise( np * 2.8 );\n            nc = noise( np * 0.7 );\n            nd = noise( np * 3.2 );\n\n            pos = center;\n            pos.x += sin(t*na) * cos(t*nb) * tan(t*na*0.15) * 0.3;\n            pos.y += tan(t*nc) * sin(t*nd) * 0.1;\n            \n            d = pow( 1.6*na / length( pos - position ), u_blobiness );\n            \n            if ( i < limit * 0.3333 ) a += d;\n            else if ( i < limit * 0.6666 ) b += d;\n            else c += d;\n\n            n += step;\n        }\n    }\n    \n    vec3 col = vec3(a*c,b*c,a*b) * 0.0001 * u_brightness;\n    \n    if ( u_scanlines ) {\n        col -= mod( gl_FragCoord.y, 2.0 ) < 1.0 ? 0.5 : 0.0;\n    }\n    \n    gl_FragColor = vec4( col, 1.0 );\n\n}\n"
  };

  try {
    gl = Sketch.create({
      container: document.getElementById('glow'),
      type: Sketch.WEBGL,
      brightness: 1,
      blobiness: 0.8,
      particles: 40,
      energy: 1.5,
      scanlines: true
    });
  } catch (_error) {
    error = _error;
    
  }

  if (gl) {
    gl.setup = function() {
      var frag, vert;
      this.clearColor(0.0, 0.0, 0.0, 1.0);
      vert = this.createShader(this.VERTEX_SHADER);
      frag = this.createShader(this.FRAGMENT_SHADER);
      this.shaderSource(vert, GLSL.vert);
      this.shaderSource(frag, GLSL.frag);
      this.compileShader(vert);
      this.compileShader(frag);
      if (!this.getShaderParameter(vert, this.COMPILE_STATUS)) {
        throw this.getShaderInfoLog(vert);
      }
      if (!this.getShaderParameter(frag, this.COMPILE_STATUS)) {
        throw this.getShaderInfoLog(frag);
      }
      this.shaderProgram = this.createProgram();
      this.attachShader(this.shaderProgram, vert);
      this.attachShader(this.shaderProgram, frag);
      this.linkProgram(this.shaderProgram);
      if (!this.getProgramParameter(this.shaderProgram, this.LINK_STATUS)) {
        throw this.getProgramInfoLog(this.shaderProgram);
      }
      this.useProgram(this.shaderProgram);
      this.shaderProgram.attributes = {
        position: this.getAttribLocation(this.shaderProgram, 'a_position')
      };
      this.shaderProgram.uniforms = {
        resolution: this.getUniformLocation(this.shaderProgram, 'u_resolution'),
        brightness: this.getUniformLocation(this.shaderProgram, 'u_brightness'),
        blobiness: this.getUniformLocation(this.shaderProgram, 'u_blobiness'),
        particles: this.getUniformLocation(this.shaderProgram, 'u_particles'),
        scanlines: this.getUniformLocation(this.shaderProgram, 'u_scanlines'),
        energy: this.getUniformLocation(this.shaderProgram, 'u_energy'),
        millis: this.getUniformLocation(this.shaderProgram, 'u_millis')
      };
      this.geometry = this.createBuffer();
      this.geometry.vertexCount = 6;
      this.bindBuffer(this.ARRAY_BUFFER, this.geometry);
      this.bufferData(this.ARRAY_BUFFER, new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0]), this.STATIC_DRAW);
      this.enableVertexAttribArray(this.shaderProgram.attributes.position);
      this.vertexAttribPointer(this.shaderProgram.attributes.position, 2, this.FLOAT, false, 0, 0);
      return this.resize();
    };
    gl.updateUniforms = function() {
      if (!this.shaderProgram) {
        return;
      }
      this.uniform2f(this.shaderProgram.uniforms.resolution, this.width, this.height);
      this.uniform1f(this.shaderProgram.uniforms.brightness, this.brightness);
      this.uniform1f(this.shaderProgram.uniforms.blobiness, this.blobiness);
      this.uniform1f(this.shaderProgram.uniforms.particles, this.particles);
      this.uniform1i(this.shaderProgram.uniforms.scanlines, this.scanlines);
      return this.uniform1f(this.shaderProgram.uniforms.energy, this.energy);
    };
    gl.draw = function() {
      this.uniform1f(this.shaderProgram.uniforms.millis, this.millis + 5000);
      this.clear(this.COLOR_BUFFER_BIT | this.DEPTH_BUFFER_BIT);
      this.bindBuffer(this.ARRAY_BUFFER, this.geometry);
      return this.drawArrays(this.TRIANGLES, 0, this.geometry.vertexCount);
    };
    gl.resize = function() {
      this.viewport(0, 0, this.width, this.height);
      return this.updateUniforms();
    };
    gui = new dat.GUI();
    gui.add(gl, 'particles').step(1.0).min(8).max(40).onChange(function() {
      return gl.updateUniforms();
    });
    gui.add(gl, 'brightness').step(0.01).min(0.1).max(1.0).onChange(function() {
      return gl.updateUniforms();
    });
    gui.add(gl, 'blobiness').step(0.01).min(0.8).max(1.5).onChange(function() {
      return gl.updateUniforms();
    });
    gui.add(gl, 'energy').step(0.01).min(0.1).max(4.0).onChange(function() {
      return gl.updateUniforms();
    });
    gui.add(gl, 'scanlines').onChange(function() {
      return gl.updateUniforms();
    });
    gui.close();
  }

}).call(this);
