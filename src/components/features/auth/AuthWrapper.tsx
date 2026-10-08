import Image from "next/image";
import Link from "next/link";
import type { PropsWithChildren } from "react";

import { Button } from "@/components/ui/common/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/common/card";

interface AuthWrapperProps {
	heading: string;
	backButtonLabel?: string;
	backButtonHref?: string;
}

export function AuthWrapper({
	children,
	heading,
	backButtonLabel,
	backButtonHref,
}: PropsWithChildren<AuthWrapperProps>) {
	return (
		<div className="flex h-full items-center justify-center">
			<Card className="w-[450px]">
				<CardHeader className="mb-2 flex flex-row items-center justify-center gap-x-4">
					<Image
						src="/images/logo.svg"
						alt="Streaming Platform"
						width={36}
						height={36}
						className="size-9"
					/>
					<CardTitle className="text-xl">{heading}</CardTitle>
				</CardHeader>
				<CardContent>{children}</CardContent>
				<CardFooter className="-mt-2">
					{backButtonLabel && backButtonHref && (
						<Button variant="ghost" className="w-full" asChild>
							<Link href={backButtonHref}>{backButtonLabel}</Link>
						</Button>
					)}
				</CardFooter>
			</Card>
		</div>
	);
}
