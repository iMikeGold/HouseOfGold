"use client";

import type { RoomDefinition } from "./types";

export default function Room({ room }: { room: RoomDefinition }) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <img
        src={room.image}
        className="absolute w-full h-full object-cover"
        alt={room.name}
      />

      {room.hotspots.map((h) => (
        <button
          key={h.id}
          className="absolute bg-yellow-400/30 px-2 py-1"
          style={{
            left: `${h.x}%`,
            top: `${h.y}%`,
          }}
          onClick={() => {
            console.log("Navigate to:", h.targetRoom);
          }}
        >
          {h.label}
        </button>
      ))}
    </div>
  );
}