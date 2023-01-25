import { 
	BuildOptions,
	build,
} from 'esbuild';
const minOptions: BuildOptions = {
	platform: "browser",
	format: "esm",

	bundle: true,
	treeShaking: true,

	entryPoints: ["src/index.ts"]
};


await build(<BuildOptions>{
	...minOptions,
	sourcemap: 'inline',
	
	minifySyntax: true,
	outfile: "dist/ladder.js",
});
await build(<BuildOptions>{
	...minOptions,
	
	minify: true,
	outfile: "dist/ladder.min.js",
});

console.log("Build Success!");