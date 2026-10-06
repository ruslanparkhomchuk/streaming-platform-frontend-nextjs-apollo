import Image from "next/image";
import Link from "next/link";

export function Logo() {
	return (
		<Link
			href="/"
			className="flex items-center gap-x-4 transition-opacity hover:opacity-75"
		>
			<Image
				src="/images/logo.svg"
				alt="Streaming Platform"
				width={36}
				height={36}
				className="size-9"
			/>
			<div className="hidden leading-tight lg:block">
				<h2 className="text-lg font-semibold text-accent-foreground">
					Streaming Platform
				</h2>
			</div>
		</Link>
	);
}
