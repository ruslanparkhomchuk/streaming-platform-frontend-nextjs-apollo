import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

import { SERVER_URL } from "@/libs/constants/url.constants";

(globalThis as Record<symbol, unknown>)[Symbol.for("apollo.deprecations")] =
	true;

const httpLink = new HttpLink({
	uri: SERVER_URL,
	credentials: "include",
});

export const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
});
