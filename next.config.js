/** @type {import('next').NextConfig} */
const path = require( "path" );

const nextConfig = {
	sassOptions : {
		includePaths : [ path.join( __dirname, "styles" ) ],
	},
	trailingSlash : false,
	reactStrictMode : true,
	optimizeFonts : false,
	output : 'standalone',
	images : {
		domains : [ "cdndev.yabex.net", "cdn.yabex.net", "cdn.yabex.ir" ],
	},
	webpack ( config )
	{
		config.module.rules.push( {
			test : /.svg$/,
			use : [ "@svgr/webpack" ],
		} );
		config.module.rules.push( {
			test : /\.(woff|woff2|eot|ttf|otf)$/i,
			type : "asset/resource",
		} );
		return config;
	},
};

module.exports = nextConfig;