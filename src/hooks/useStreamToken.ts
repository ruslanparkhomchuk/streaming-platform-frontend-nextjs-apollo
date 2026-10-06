import { jwtDecode, type JwtPayload } from "jwt-decode";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useGenerateStreamTokenMutation } from "@/graphql/generated/output";

import { useAuth } from "./useAuth";

export function useStreamToken(channelId: string) {
	const [token, setToken] = useState("");
	const [name, setName] = useState("");
	const [identity, setIdentity] = useState("");

	const { isAuthenticated } = useAuth();

	const [generateStreamToken] = useGenerateStreamTokenMutation({
		onCompleted(data) {
			const viewerToken = data.generateStreamToken.token;

			setToken(viewerToken);

			const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
				name?: string;
			};

			const name = decodedToken.name;
			const identity = decodedToken.jti;

			if (name) {
				setName(name);
			}
			if (identity) {
				setIdentity(identity);
			}
		},
		onError(error) {
			toast.error(error.message);
		},
	});

	useEffect(() => {
		async function generateToken() {
			await generateStreamToken({
				variables: {
					data: {
						channelId,
					},
				},
			});
		}

		const timeoutId = setTimeout(generateToken, 1000);

		return () => clearTimeout(timeoutId);
	}, [generateStreamToken, isAuthenticated, channelId]);

	return { token, name, identity };
}
