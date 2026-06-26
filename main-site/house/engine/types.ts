export type HotspotType =
  | "door"
  | "frame"
  | "speaker"
  | "projector"
  | "book"
  | "staircase"
  | "window"
  | "compass"
  | "seal"
  | "key";

export type CameraState = {
  zoom: number;
  panX: number;
  panY: number;
};

export type Hotspot = {
  id: string;
  type: HotspotType;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  route?: string;
  action?: "inspect" | "play" | "floorplan" | "unlock";
  camera?: CameraState;
};

export type RoomAtmosphere = {
  vignette: "soft" | "heavy";
  particles?: "gold-dust" | "starlight" | "haze";
};

export type RoomDefinition = {
  id: string;
  name: string;
  image: string;
  description: string;
  cameraStart: CameraState;
  atmosphere: RoomAtmosphere;
  preloadNext: string[];
  hotspots: Hotspot[];
};
