import { ApolloClient, InMemoryCache } from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

import { SERVER_URL } from "@/libs/constants/url.constants";

(globalThis as Record<symbol, unknown>)[Symbol.for("apollo.deprecations")] =
	true;

const uploadLink = createUploadLink({
	uri: SERVER_URL,
	credentials: "include",
	headers: {
		"apollo-require-preflight": "true",
	},
});

export const client = new ApolloClient({
	link: uploadLink,
	cache: new InMemoryCache(),
});
