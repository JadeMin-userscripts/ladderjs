import ESBuild from 'esbuild';
const options = {
	platform: 'browser',
	format: 'cjs',

	bundle: true,
	treeShaking: true,

	entryPoints: [
		"src/index.js",
	]
};


await ESBuild.build({
	...options,
	minify: false,
	outfile: "dist/ladder.js",
});
await ESBuild.build({
	...options,
	minify: true,
	outfile: "dist/ladder.min.js",
});

console.log("Build Success!");