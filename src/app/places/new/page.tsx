"use client"
import { NextPage } from "next";
import { useState } from "react";
import { Roboto } from "next/font/google";
const RobotoFont = Roboto({ weight: "300", subsets: ["latin"] });
import { useRouter } from "next/navigation";

const PagesNew: NextPage = () => {
  const router = useRouter();
  const search_text_name = router?.query?.name;
  const [name, set_name] = useState(search_text_name || "");
  const [address, set_address] = useState("");
  const [current_tag, set_current_tag] = useState("");
  const [tags, set_tags] = useState([]);
  const add_tag = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === "Enter") {
      set_tags([...tags, { text: current_tag }]);
      set_current_tag("");
    }
  };
  // const create_place = api.places.create.useMutation({})
  // const save_place = () => {
  //     create_place.mutate({
  //         name,
  //         address,
  //         tags,
  //         events: []
  //     })
  //     reset_form()
  // }
  const reset_form = () => {
    set_name("");
    set_address("");
    set_tags([]);
    set_current_tag("");
  };

  const save_place = async () => {
    const place = {
      name,
      address,
      tags,
    };
    const response = await fetch("http://localhost:3000/places", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(place),
    });
    if (response.ok) {
      reset_form();
    }
  };

  return (
    <div
      className={`flex flex-col items-center px-5 py-10 gap-3 ${RobotoFont.className}`}
    >
      <h1 className="text-2xl">Place information</h1>
      <div className="form">
        <div className="form-group">
          <label htmlFor="place_name">Name</label>
          <input
            type="text"
            onChange={(ev) => set_name(ev.target.value)}
            value={name}
            className="rounded-xl px-2"
          />
        </div>

        <div className="form-group">
          <label htmlFor="place_address">Address</label>
          <input
            type="text"
            className="rounded-xl px-2"
            onChange={(ev) => set_address(ev.target.value)}
            value={address}
          />
        </div>

        <div className="form-group flex gap-2">
          <label htmlFor="place-tags">Tags</label>
          <input
            type="text"
            className="rounded-xl px-2"
            onChange={(ev) => set_current_tag(ev.target.value)}
            onKeyUp={(ev) => add_tag(ev)}
            value={current_tag}
          />
          <ul className="flex flex-row gap-3">
            {tags.map((tag, index) => {
              return (
                <li
                  key={index}
                  className="px-1 py-1 neon_border_purple neon_cyan_text"
                >
                  {tag.text}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="form-group gap-3 mt-10">
          <button
            className="neon_border_purple neon_cyan_text p-2"
            onClick={save_place}
          >
            Save Place
          </button>
        </div>
      </div>
    </div>
  );
};

export default PagesNew;
