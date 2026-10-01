require("dotenv/config");

module.exports = {
	client: {
		service: {
			name: "streaming-platform",
			url: process.env.NEXT_PUBLIC_SERVER_URL,
			skipSSLValidation: true,
		},
		includes: ["./src/graphql/**/*.graphql"],
	},
};
