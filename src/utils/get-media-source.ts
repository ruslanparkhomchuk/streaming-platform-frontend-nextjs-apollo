import { MEDIA_URL } from "@/libs/constants/url.constants";

export function getMediaSource(path: string) {
	if (path.startsWith("blob:") || path.startsWith("http")) {
		return path;
	}

	return `${MEDIA_URL}/${path}`;
}
