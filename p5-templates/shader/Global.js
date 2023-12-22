const circle = `
  float circle(vec2 uv, vec2 position, float radius) {
    return smoothstep( radius-.005, radius+.005, length(uv-position));
  }
`

const frag = `#version 300 es
  precision mediump float;

  uniform sampler2D tex0;
  uniform vec2 texelSize;
  uniform vec2 canvasSize;
  uniform vec2 mouse;
  uniform float time;

  ${circle}

  in vec2 vTexCoord;
  out vec4 fragColor;
  void main() {
    vec2 uv = vTexCoord;
    vec3 canvas = texture(tex0, uv).rgb;
    canvas *= circle(uv, mouse, .05);
    canvas *= vec3(uv, abs(sin(time*0.01)));
    fragColor = vec4(canvas, 1.);
  }
`

const vert = `#version 300 es

  in vec4 aPosition;
  in vec2 aTexCoord;

  out vec2 vTexCoord;

  void main() {
    vTexCoord = aTexCoord;
    gl_Position = aPosition;
  }
`
