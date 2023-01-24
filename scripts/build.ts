import { 
	CommonOptions, BuildOptions,
	build,
} from 'esbuild';
const minOptions: BuildOptions = {
	platform: 'browser',
	format: 'cjs',

	bundle: true,
	treeShaking: true,

	entryPoints: ["src/index.ts"]
};


await build({
	...minOptions,
	sourcemap: 'inline',

	minifySyntax: true,
	outfile: "dist/ladder.js",
})
await build({
	...minOptions,
	
	minify: true,
	outfile: "dist/ladder.min.js",
});

console.log("Build Success!");