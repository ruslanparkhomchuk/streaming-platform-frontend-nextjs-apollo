"use client";

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Heading } from "@/components/ui/elements/Heading";

import {
	type FindAllStreamsQuery,
	useFindAllStreamsQuery,
} from "@/graphql/generated/output";

import { StreamCardSkeleton } from "./StreamCard";
import { StreamsList } from "./StreamsList";

interface StreamsContentProps {
	streams: FindAllStreamsQuery["findAllStreams"];
}

export function StreamsContent({ streams }: StreamsContentProps) {
	const t = useTranslations("streams");

	const searchParams = useSearchParams();
	const searchTerm = searchParams.get("searchTerm");

	const [streamList, setStreamList] = useState<
		FindAllStreamsQuery["findAllStreams"]
	>(streams ?? []);
	const [hasMore, setHasMore] = useState(true);

	const isFetchingRef = useRef(false);

	const { data, fetchMore } = useFindAllStreamsQuery({
		variables: {
			filters: {
				searchTerm,
				take: 12,
				skip: 0,
			},
		},
		fetchPolicy: "network-only",
	});

	useEffect(() => {
		if (data?.findAllStreams) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setStreamList(data.findAllStreams);
			setHasMore(data.findAllStreams.length === 12);
		}
	}, [data, searchTerm]);

	async function fetchMoreStreams() {
		if (!hasMore || isFetchingRef.current) {
			return;
		}

		isFetchingRef.current = true;

		try {
			const { data: newData } = await fetchMore({
				variables: {
					filters: {
						searchTerm,
						take: 12,
						skip: streamList.length,
					},
				},
			});

			if (newData.findAllStreams.length) {
				setStreamList(prev => [...prev, ...newData.findAllStreams]);
				setHasMore(newData.findAllStreams.length === 12);
			} else {
				setHasMore(false);
			}
		} finally {
			isFetchingRef.current = false;
		}
	}

	return (
		<>
			<Heading
				title={
					searchTerm
						? `${t("searchHeading")} "${searchTerm}"`
						: t("heading")
				}
			/>
			<StreamsList streams={streamList} />
			{hasMore && <LoadMoreTrigger onVisible={fetchMoreStreams} />}
		</>
	);
}

function LoadMoreTrigger({ onVisible }: { onVisible: () => void }) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const element = ref.current;

		if (!element) {
			return;
		}

		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				onVisible();
			}
		});

		observer.observe(element);

		return () => observer.disconnect();
	}, [onVisible]);

	return (
		<div
			ref={ref}
			className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
		>
			{Array.from({ length: 4 }).map((_, index) => (
				<StreamCardSkeleton key={index} />
			))}
		</div>
	);
}
