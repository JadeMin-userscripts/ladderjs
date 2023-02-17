import { 
	BuildOptions,
	build,
} from 'esbuild';

const defaultOption: BuildOptions = {
	platform: "browser",
	format: "esm",

	bundle: true,
	treeShaking: true,

	entryPoints: ["src/index.ts"]
};


await build({
	...defaultOption,
	sourcemap: 'inline',
	
	minifySyntax: true,
	outfile: "dist/ladder.js",
});
await build({
	...defaultOption,
	
	minify: true,
	outfile: "dist/ladder.min.js",
});
console.log("Build Success!");