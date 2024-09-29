import { IPlaceEvent } from "./place_events"
import { useRouter } from "next/navigation";

export default function PlaceEvent({ event, showPlaceName }: { event: IPlaceEvent, showPlaceName?: boolean }) {
    const { push } = useRouter();
    const { start_at } = event;

    const date_status = () => {
        const now = new Date();
        const start_at = new Date(event.start_at);
        const diff = start_at.getTime() - now.getTime();
        const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
        if (diffDays < 0) {
            return "text-red-300" // Past
        } else if (diffDays === 0) {
            return "text-green-300" // Today
        } else if (diffDays === 1) {
            return "text-cyan-300" // Tomorrow+
        } else if (diffDays < 7) {
            return "text-blue-300" // This week
        } else if (diffDays < 30) {
            return "text-purple-300" // This month
        } else {
            return "text-gray-300" // Later
        }
    }

    return (
        <div className="w-full border-b pb-5">
            <div className="flex flex-row w-full justify-between" onClick={() => event.Place && push(`places/${event.Place.id}`)}>
                <p className="text-2xl neon_cyan_text ">{event.name}</p>
                <p className={`${date_status()} inline-table text-right w-1/3`}><p>{start_at.toLocaleString("de-DE").split(",")[0]}</p></p>
            </div>
        </div >
    )
}
