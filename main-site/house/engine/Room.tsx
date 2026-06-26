"use client";

import Link from "next/link";
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
  const [camera, setCamera] = useState<CameraState>(room.cameraStart);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [inspected, setInspected] = useState<Hotspot | null>(null);

  useEffect(() => {
    setCamera(room.cameraStart);
    setActiveHotspot(null);
    setInspected(null);
  }, [room]);

  useEffect(() => {
    room.preloadNext.forEach((src) => {
      const image = new Image();
      image.src = src;
    });
  }, [room.preloadNext]);

  const cameraStyle = useMemo(
    () => ({
      transform: `translate3d(${camera.panX}%, ${camera.panY}%, 0) scale(${camera.zoom})`,
    }),
    [camera],
  );

  function focusHotspot(hotspot: Hotspot) {
    setActiveHotspot(hotspot);
    setCamera(hotspot.camera ?? room.cameraStart);

    if (!hotspot.route) {
      setInspected(hotspot);
    }
  }

  return (
    <main className="house-shell">
      <section className="house-window" aria-label={room.name}>
        <div className={`room-stage room-stage--${room.atmosphere.vignette}`}>
          <div className="room-camera" style={cameraStyle}>
            <img className="room-image" src={room.image} alt="" draggable={false} />

            {room.hotspots.map((hotspot) => {
              const isActive = activeHotspot?.id === hotspot.id;
              const style = {
                left: `${hotspot.x}%`,
                top: `${hotspot.y}%`,
                width: `${hotspot.width}%`,
                height: `${hotspot.height}%`,
              };

              const className = `hotspot hotspot--${hotspot.type} ${
                isActive ? "hotspot--active" : ""
              }`;

              if (hotspot.route) {
                return (
                  <Link
                    aria-label={hotspot.label}
                    className={className}
                    href={hotspot.route}
                    key={hotspot.id}
                    onMouseEnter={() => focusHotspot(hotspot)}
                    onFocus={() => focusHotspot(hotspot)}
                    onClick={() => focusHotspot(hotspot)}
                    style={style}
                  >
                    <span>{typeGlyph[hotspot.type]}</span>
                  </Link>
                );
              }

              return (
                <button
                  aria-label={hotspot.label}
                  className={className}
                  key={hotspot.id}
                  onClick={() => focusHotspot(hotspot)}
                  style={style}
                  type="button"
                >
                  <span>{typeGlyph[hotspot.type]}</span>
                </button>
              );
            })}
          </div>

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

          {inspected ? (
            <div className="room-inspection" role="status">
              <strong>{inspected.label}</strong>
              <span>This detail is marked for future content.</span>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
