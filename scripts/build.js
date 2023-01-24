import ESBuild from 'esbuild';
import getBuildFor from "./types.js";
const buildArgv = process.argv.slice(2)[0];
const buildFor = getBuildFor(buildArgv);


await ESBuild.build({
	platform: 'browser',
	format: 'cjs',

	bundle: true,
	treeShaking: false,
	minify: buildFor.PUBLISH,

	entryPoints: [
		"src/index.js",
	],
	outdir: "dist/"
});
console.log(`${buildArgv} - 빌드 작업이 완료되었습니다!`);