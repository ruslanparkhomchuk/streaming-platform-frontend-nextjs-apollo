import { useTracks } from "@livekit/components-react";
import { type RemoteParticipant, Track } from "livekit-client";
import { useEffect, useRef, useState } from "react";
import { useEventListener } from "usehooks-ts";

import { FullscreenControl } from "./FullscreenControl";
import { VolumeControl } from "./VolumeControl";

interface StreamPlayerProps {
	participant: RemoteParticipant;
}

export function StreamPlayer({ participant }: StreamPlayerProps) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);

	const [volume, setVolume] = useState(0);
	const [isFullscreen, setIsFullscreen] = useState(false);

	function onVolumeChange(value: number) {
		setVolume(+value);

		if (videoRef.current) {
			videoRef.current.muted = value === 0;
			videoRef.current.volume = +value * 0.01;
		}
	}

	function toggleMute() {
		const isMuted = volume === 0;

		setVolume(isMuted ? 50 : 0);

		if (videoRef.current) {
			videoRef.current.muted = !isMuted;
			videoRef.current.volume = isMuted ? 0.5 : 0;
		}
	}

	function toggleFullscreen() {
		if (isFullscreen) {
			document.exitFullscreen();
		} else if (wrapperRef.current) {
			wrapperRef.current.requestFullscreen();
		}
	}

	function handleFullscreenChange() {
		const isCurrentlyFullscreen = document.fullscreenElement !== null;

		setIsFullscreen(isCurrentlyFullscreen);
	}

	useEventListener(
		"fullscreenchange" as keyof WindowEventMap,
		handleFullscreenChange,
	);

	const tracks = useTracks([
		Track.Source.Camera,
		Track.Source.Microphone,
	]).filter(track => track.participant.identity === participant.identity);

	useEffect(() => {
		const videoElement = videoRef.current;

		if (!videoElement) {
			return;
		}

		tracks.forEach(track => {
			track.publication.track?.attach(videoElement);
		});
	}, [tracks]);

	return (
		<div ref={wrapperRef} className="relative flex h-full">
			<video ref={videoRef} muted />
			<div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100">
				<div className="absolute bottom-0 flex h-16 w-full items-center justify-between px-4">
					<VolumeControl
						onToggle={toggleMute}
						onChange={onVolumeChange}
						value={volume}
					/>
					<FullscreenControl
						isFullscreen={isFullscreen}
						onToggle={toggleFullscreen}
					/>
				</div>
			</div>
		</div>
	);
}
