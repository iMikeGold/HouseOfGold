import { notFound } from "next/navigation";
import Room from "@/house/engine/Room";
import { getRoom, roomIds } from "@/house/rooms";

type RoomPageProps = {
  params: Promise<{
    room: string;
  }>;
};

export function generateStaticParams() {
  return roomIds.map((room) => ({ room }));
}

export default async function RoomPage({ params }: RoomPageProps) {
  const { room: roomId } = await params;
  const room = getRoom(roomId);

  if (!room) {
    notFound();
  }

  return <Room room={room} />;
}
