import ESBuild from 'esbuild';
const options = {
	platform: 'browser',
	format: 'cjs',

	bundle: true,
	treeShaking: false,

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
console.log("빌드 작업이 완료되었습니다!");