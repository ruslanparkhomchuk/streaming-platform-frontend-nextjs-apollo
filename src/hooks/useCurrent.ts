import { useEffect } from "react";

import {
	useClearSessionCookieMutation,
	useFindProfileQuery,
} from "@/graphql/generated/output";

import { useAuth } from "./useAuth";

export function useCurrent() {
	const { isAuthenticated, exit } = useAuth();

	const { data, loading, refetch, error } = useFindProfileQuery();

	const [clear] = useClearSessionCookieMutation();

	useEffect(() => {
		if (error) {
			if (isAuthenticated) {
				clear();
			}
			exit();
		}
	}, [error, isAuthenticated, clear, exit]);

	return {
		user: data?.findProfile,
		isLoadingProfile: loading,
		refetch,
	};
}
