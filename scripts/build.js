const {build} = require('esbuild');
const dotenv = require('dotenv');
dotenv.config({path:'./scripts/.env'});
const { HOST, USER, PASS, DB } = process.env;
const define = {
    'process.env.HOST': JSON.stringify(HOST),
    'process.env.USER': JSON.stringify(USER),
    'process.env.PASS': JSON.stringify(PASS),
    'process.env.DB': JSON.stringify(DB),
}
const envPlugin ={
    name: 'env-preload',
    setup(build){
        build.onLoad({ filter: /.*\.ts$/ }, async (args) => {
            if (args.path === require.resolve('../src/services/sequelize.ts')) {
              const contents = `
                process.env.HOST= "${HOST}";
                process.env.USER= "${USER}";
                process.env.PASS= "${PASS}";
                process.env.DB= "${DB}";
                ${await require('fs').promises.readFile(args.path, 'utf8')}
              `;
              return { contents, loader: 'ts' };
            }
          });
    }
}
const options = {
        entryPoints: ['./scripts/server.ts'],
        outfile: './scripts/server.bundle.js',
        bundle: true,
        minify: false,
        platform:'node',
        target: 'es2022',
        plugins: [envPlugin]
}
    
build(options)
    .then(() => console.log('⚡Bundle build complete ⚡'))
    .catch(() => {
        process.exit(1);
    });