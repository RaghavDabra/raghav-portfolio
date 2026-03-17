const fragment = /* glsl */ `
  uniform sampler2D uTexture;
  uniform float uAlpha;
  uniform vec2 uOffset;
  varying vec2 vUv;

  vec3 rgbShift(sampler2D textureimage, vec2 uv, vec2 offset){
      float r = texture2D(textureimage, uv + offset).r;
      vec2 gb = texture2D(textureimage, uv).gb;
      return vec3(r, gb);
  }

  void main(){
      vec4 texColor = texture2D(uTexture, vUv);
      vec3 color = rgbShift(uTexture, vUv, uOffset * 5.0);
      float alpha = texColor.a * uAlpha;
      gl_FragColor = vec4(color, alpha);
  }
`

export default fragment
