export type Hotspot = {
  id: string;
  x: number;
  y: number;
  type: "door" | "frame" | "object";
  label: string;
  targetRoom?: string;
};

export type RoomDefinition = {
  id: string;
  name: string;
  image: string;
  hotspots: Hotspot[];
};