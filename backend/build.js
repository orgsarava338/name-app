require('esbuild').buildSync({
  entryPoints: ['./src/server.js'],
  bundle: true,
  platform: 'node',
  target: ['node18'],
  format: 'cjs',
  outdir: 'dist',
  external: ['fs', 'path', 'crypto', 'cookie-parser']
})