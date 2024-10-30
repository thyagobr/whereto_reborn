import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function PlaceEvent({ event }) {
  //   const { push } = useRouter();
  //   const { start_at } = event;

  //   const date_status = () => {
  //     const now = new Date();
  //     const start_at = new Date(event.start_at);
  //     const diff = start_at.getTime() - now.getTime();
  //     const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
  //     if (diffDays < 0) {
  //       return "text-red-300"; // Past
  //     } else if (diffDays === 0) {
  //       return "text-green-300"; // Today
  //     } else if (diffDays === 1) {
  //       return "text-cyan-300"; // Tomorrow+
  //     } else if (diffDays < 7) {
  //       return "text-blue-300"; // This week
  //     } else if (diffDays < 30) {
  //       return "text-purple-300"; // This month
  //     } else {
  //       return "text-gray-300"; // Later
  //     }
  //   };

  return (
    <Card className="w-full text-left">
      <CardHeader className="text-left">
        <CardTitle>
          <Link href={`/events/${event.id}`}>{event.name}</Link>
        </CardTitle>
        <p>{event.date}</p>
      </CardHeader>
      <Separator className="mb-5" />
      <CardContent>{event.description}</CardContent>
    </Card>
  );
}
