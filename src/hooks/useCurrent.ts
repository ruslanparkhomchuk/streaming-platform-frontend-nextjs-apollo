import { useApolloClient } from "@apollo/client";
import { useEffect } from "react";

import {
	useClearSessionCookieMutation,
	useFindProfileQuery,
} from "@/graphql/generated/output";

import { useAuth } from "./useAuth";

export function useCurrent() {
	const { isAuthenticated, auth, exit } = useAuth();

	const { data, loading, refetch, error } = useFindProfileQuery();

	const [clear] = useClearSessionCookieMutation();

	const client = useApolloClient();

	useEffect(() => {
		if (data?.findProfile && !isAuthenticated) {
			auth();
		}
	}, [data, isAuthenticated, auth]);

	useEffect(() => {
		const isAuthError = error?.graphQLErrors.some(
			e =>
				e.extensions?.code === "UNAUTHENTICATED" ||
				e.message === "Unauthorized",
		);

		if (isAuthError) {
			if (isAuthenticated) {
				clear();
				client.clearStore();
			}
			exit();
		}
	}, [error, isAuthenticated, clear, exit, client]);

	return {
		user: data?.findProfile,
		isLoadingProfile: loading,
		refetch,
	};
}
