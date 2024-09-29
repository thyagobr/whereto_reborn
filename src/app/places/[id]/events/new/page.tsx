"use client";
import { NextPage } from "next";
import { useState } from "react";
import { Roboto } from "next/font/google";
const RobotoFont = Roboto({ weight: "300", subsets: ["latin"] });
import { useRouter } from "next/navigation";

import { redirect } from "next/navigation";

const PageEventsNew: NextPage = () => {
  const [name, set_name] = useState("");
  const [date, set_date] = useState("");
  const [url, set_url] = useState("");

  const router = useRouter();
  const placeId = 1 as string;
  const { push } = useRouter();

  const save_event = () => {
    let formated_date = new Date(date).toISOString();
    fetch(`http://localhost:3000/places/${placeId}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        start_at: date,
        link: url,
      }),
    })
      .then((res) => res.json())
      .then((res) => setPlaces(res.places))
      .catch((err) => console.log(err));
    push(`/places/${placeId}`);
  };

  return (
    <>
      <div
        className={`flex flex-col items-center px-5 py-10 gap-3 ${RobotoFont.className}`}
      >
        <h1 className="text-2xl">Event</h1>
        <div className="form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              onChange={(ev) => set_name(ev.target.value)}
              value={name}
              className="rounded-xl px-2"
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              className="rounded-xl px-2 text-black"
              onChange={(ev) => set_date(ev.target.value)}
              value={date}
            />
          </div>

          <div className="form-group">
            <label htmlFor="url">Link</label>
            <input
              type="text"
              className="rounded-xl px-2"
              onChange={(ev) => set_url(ev.target.value)}
              value={url}
            />
          </div>

          <div className="form-group gap-3 mt-10">
            <button
              className="neon_border_purple neon_cyan_text p-2"
              onClick={save_event}
            >
              Save event
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageEventsNew;
