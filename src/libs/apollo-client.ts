import { ApolloClient, InMemoryCache, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { createClient } from "graphql-ws";

import { SERVER_URL, WEBSOCKET_URL } from "@/libs/constants/url.constants";

(globalThis as Record<symbol, unknown>)[Symbol.for("apollo.deprecations")] =
	true;

const uploadLink = createUploadLink({
	uri: SERVER_URL,
	credentials: "include",
	headers: {
		"apollo-require-preflight": "true",
	},
});

const wsLink =
	typeof window !== "undefined"
		? new GraphQLWsLink(
				createClient({
					url: WEBSOCKET_URL,
					shouldRetry: () => true,
				}),
			)
		: null;

const splitLink = wsLink
	? split(
			({ query }) => {
				const definition = getMainDefinition(query);

				return (
					definition.kind === "OperationDefinition" &&
					definition.operation === "subscription"
				);
			},
			wsLink,
			uploadLink,
		)
	: uploadLink;

export const client = new ApolloClient({
	link: splitLink,
	cache: new InMemoryCache(),
});
