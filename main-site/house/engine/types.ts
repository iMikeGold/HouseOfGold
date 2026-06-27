// ==============================================
// CORE TYPES — EDIT THESE CAREFULLY
// ==============================================

export type HotspotType =
  | "door"        // → Enter another room
  | "frame"       // → View an image/object
  | "speaker"     // → Play audio
  | "projector"   // → Play video/film
  | "book"        // → Open text/document
  | "staircase"   // → Change floor/level
  | "window"      // → Look outside / reveal view
  | "compass"     // → Open floorplan/navigation
  | "seal"        // → Open official content
  | "key";        // → Unlock hidden area

export type CameraState = {
  zoom: number;   // 1 = normal, >1 = closer, <1 = wider
  panX: number;   // Horizontal shift (%) — positive = right, negative = left
  panY: number;   // Vertical shift (%) — positive = down, negative = up
};

export type Hotspot = {
  id: string;
  type: HotspotType;
  label: string;
  x: number;      // Position from left (%)
  y: number;      // Position from top (%)
  width: number;  // Width (%)
  height: number; // Height (%)
  route?: string; // If set: navigates to another room
  action?: "inspect" | "play" | "floorplan" | "unlock"; // If no route
  camera?: CameraState; // Camera movement when hovering/clicking
};

export type RoomAtmosphere = {
  vignette: "soft" | "heavy";       // Darken edges
  particles?: "gold-dust" | "starlight" | "haze"; // Overlay effect
};

// ==============================================
// MEDIA SYSTEM — supports static + animated
// ==============================================
export type RoomMedia = {
  base: {
    type: "image" | "video";
    src: string;                     // Main file path
    poster?: string;                 // Fallback image if video fails/loads slow
    loop?: boolean;                  // Only applies to videos
    muted?: boolean;                 // Only applies to videos
    playsInline?: boolean;           // Critical for mobile
  };
  variants?: Array<{                 // Optional: different angles/states
    id: string;
    label?: string;
    type: "image" | "video";
    src: string;
  }>;
};

// ==============================================
// TRANSITION SYSTEM — between rooms
// ==============================================
export type RoomTransition = {
  video?: string;    // Path to transition animation
  duration?: number; // Time in ms before navigating (match video length)
};

// ==============================================
// FULL ROOM DEFINITION
// ==============================================
export type RoomDefinition = {
  id: string;
  name: string;
  media: RoomMedia;
  description: string;
  cameraStart: CameraState;
  atmosphere: RoomAtmosphere;
  transition?: RoomTransition;
  preloadNext: string[]; // Files to load in background for smooth movement
  hotspots: Hotspot[];
};