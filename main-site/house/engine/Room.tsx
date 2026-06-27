"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { CameraState, Hotspot, RoomDefinition } from "@/house/engine/types";

type RoomProps = {
  room: RoomDefinition;
};

const typeGlyph: Record<Hotspot["type"], string> = {
  door: "Enter",
  frame: "View",
  speaker: "Listen",
  projector: "Watch",
  book: "Read",
  staircase: "Ascend",
  window: "Look",
  compass: "Map",
  seal: "Open",
  key: "Unlock",
};

export default function Room({ room }: RoomProps) {
  const router = useRouter();
  const [camera, setCamera] = useState<CameraState>(room.cameraStart);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [inspected, setInspected] = useState<Hotspot | null>(null);
  const [transitionVideo, setTransitionVideo] = useState<string | null>(null);
  const [videoReady, setVideoReady] = useState(false);

  // Reset when room changes
  useEffect(() => {
    setCamera(room.cameraStart);
    setActiveHotspot(null);
    setInspected(null);
    setTransitionVideo(null);
    setVideoReady(false);
  }, [room]);

  // Preload assets
  useEffect(() => {
    room.preloadNext.forEach((src) => {
      if (src.match(/\.(mp4|MP4)$/)) {
        const v = document.createElement("video");
        v.preload = "auto";
        v.src = src;
      } else {
        const img = new Image();
        img.src = src;
      }
    });
  }, [room.preloadNext]);

  const cameraStyle = useMemo(() => ({
    transform: `translate3d(${camera.panX}%, ${camera.panY}%, 0) scale(${camera.zoom})`,
    transition: "transform 0.35s ease-out", // Smooth animation for zoom/pan
  }), [camera]);

  // Runs on HOVER AND CLICK
  function focusHotspot(hotspot: Hotspot) {
    setActiveHotspot(hotspot);
    setCamera(hotspot.camera ?? room.cameraStart);
  }

  // Runs only on CLICK
  function handleHotspotClick(hotspot: Hotspot) {
    if (!hotspot.route) {
      setInspected(hotspot);
      return;
    }

    // Smooth transition flow
    if (room.transition?.video) {
      setVideoReady(false);
      setTransitionVideo(room.transition.video);

      // Wait for video to be ready, then play and navigate
      const delay = room.transition.duration ?? 1200;
      setTimeout(() => {
        setTransitionVideo(null);
        setVideoReady(false);
        router.push(hotspot.route);
      }, delay);
    } else {
      router.push(hotspot.route);
    }
  }

  return (
    <main className="house-shell">
      <section className="house-window" aria-label={room.name}>
        <div className={`room-stage room-stage--${room.atmosphere.vignette}`}>

          <div className="room-camera" style={cameraStyle}>
            {/* Main room media */}
            {room.media.base.type === "video" ? (
              <video
                className="room-image"
                src={room.media.base.src}
                poster={room.media.base.poster}
                autoPlay
                loop={room.media.base.loop ?? true}
                muted={room.media.base.muted ?? true}
                playsInline={room.media.base.playsInline ?? true}
                disablePictureInPicture
                preload="auto"
              />
            ) : (
              <img
                className="room-image"
                src={room.media.base.src}
                alt=""
                draggable={false}
              />
            )}

            {/* Hotspots: now trigger zoom on hover AND click */}
            {room.hotspots.map((hotspot) => {
              const isActive = activeHotspot?.id === hotspot.id;
              const style = {
                left: `${hotspot.x}%`,
                top: `${hotspot.y}%`,
                width: `${hotspot.width}%`,
                height: `${hotspot.height}%`,
              };

              const className = `hotspot hotspot--${hotspot.type} ${isActive ? "hotspot--active" : ""}`;

              return (
                <button
                  key={hotspot.id}
                  aria-label={hotspot.label}
                  className={className}
                  onMouseEnter={() => focusHotspot(hotspot)} // Hover zoom
                  onFocus={() => focusHotspot(hotspot)}
                  onMouseLeave={() => { // Reset when mouse leaves
                    if (!inspected) {
                      setActiveHotspot(null);
                      setCamera(room.cameraStart);
                    }
                  }}
                  onClick={() => handleHotspotClick(hotspot)}
                  style={style}
                  type="button"
                >
                  <span>{typeGlyph[hotspot.type]}</span>
                </button>
              );
            })}
          </div>

          {/* ✅ Transition video: full opacity, no overlap glitches */}
          {transitionVideo && (
            <video
              className="room-transition"
              src={transitionVideo}
              autoPlay
              muted
              playsInline
              disablePictureInPicture
              onCanPlayThrough={() => setVideoReady(true)}
              style={{ opacity: videoReady ? 1 : 0, transition: "opacity 0.15s ease" }}
            />
          )}

          <div className={`room-particles room-particles--${room.atmosphere.particles ?? "none"}`} />

          <button
            aria-label="Reset view"
            className="room-compass"
            onClick={() => {
              setActiveHotspot(null);
              setInspected(null);
              setCamera(room.cameraStart);
            }}
            type="button"
          >
            +
          </button>

          <div className="room-title">
            <span>{room.name}</span>
            <small>{activeHotspot?.label ?? room.description}</small>
          </div>

          {inspected && (
            <div className="room-inspection" role="status">
              <strong>{inspected.label}</strong>
              <span>This detail is marked for future content.</span>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}