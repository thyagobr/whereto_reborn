import { Place } from "./place_card";
import PlaceEvent from "./place_event";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";

export type IPlaceEvent = {
    id: string;
    name: string;
    start_at: Date;
    url: string;
    Place?: Place;
}

export default function PlaceEvents({ events, showPlaceName, placeId }: { events?: IPlaceEvent[], showPlaceName?: boolean, placeId?: string }) {
    const [placeEvents, setPlaceEvents] = useState<IPlaceEvent[]>([]);

    if (!placeId) return <><p>No placeId given.</p></>

    useEffect(() => {
        fetch(`http://localhost:3000/places/${placeId}/events`).then(res => res.json()).then(res => setPlaceEvents(res.events))
    }, [])

    useEffect(() => {
        console.log("events", events)
    }, [events])
    
    return <div className="flex flex-col justify-around gap-3 w-full">
        {placeEvents && placeEvents.length > 0 ? 
        placeEvents.map((event: any) => <PlaceEvent event={event} key={event.id} />) :
        <><p className="text-gray-400">No events.</p></>}
    </div>
}
