import * as esbuild from 'esbuild';

export async function build({ entryPoints = ['src/extension.ts'], outfile = 'dist/extension.js' } = {}) {
    const isWatch = process.argv.includes('--watch');
    const isMinify = process.argv.includes('--minify');

    const options = {
        entryPoints,
        bundle: true,
        outfile,
        external: ['vscode'],
        format: 'cjs',
        platform: 'node',
        target: 'es2022',
        sourcemap: true,
        minify: isMinify,
    };

    if (isWatch) {
        const ctx = await esbuild.context(options);
        await ctx.watch();
        console.log('Watching for changes...');
    } else {
        await esbuild.build(options);
    }
}
