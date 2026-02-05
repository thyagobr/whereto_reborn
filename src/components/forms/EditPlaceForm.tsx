"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TagInput } from "../TagInput/TagInput";
import { Tag } from "../Tag";
import { useEditPlace } from "@/hooks/places/useEditPlace";
import { toast } from "sonner";

type Place = {
  id: string;
  name: string;
  address: string;
  city?: string;
  country?: string;
  tags: { id?: string; text: string }[];
};

const cityOptions = [
  { value: "berlin", label: "Berlin" },
  { value: "natal", label: "Natal" },
]

const countryOptions = [
  { value: "germany", label: "Germany" },
  { value: "brazil", label: "Brasil" },
]

export const EditPlaceForm = ({ place }: { place: Place }) => {
  const [placeData, setPlaceData] = useState<Place>(place);
  const { trigger } = useEditPlace(place.id);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.promise(
      trigger(placeData)
      ,{
        loading: "Saving place...",
        success: async (result) => {
          router.push(`/places/${result.data.place.id}`);
          return "Place saved successfully.";
        },
        error: (error) => {
          console.log(error);
          return error.message;
        },
       }
    )
  };

  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium text-white">
          Name
        </label>
        <input
          id="name"
          name="name"
          value={placeData.name}
          onChange={(e) => { setPlaceData({ ...placeData, name: e.target.value }) }}
          className="bg-slate-800 text-white rounded-md p-2"
        />
      </div>

      <div className="flex justify-between gap-10">
        <div className="w-full">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-medium text-white">
              City
            </label>
            <select
              id="city"
              name="city"
              value={placeData.city}
              onChange={(e) => setPlaceData({ ...placeData, city: e.target.value })}
              className="bg-slate-800 text-white rounded-md p-2"
            >
              {cityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-medium text-white">
              Country
            </label>
            <select
              id="country"
              name="country"
              value={placeData.country}
              onChange={(e) => setPlaceData({ ...placeData, country: e.target.value })}
              className="bg-slate-800 text-white rounded-md p-2"
            >
              {countryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="address" className="text-sm font-medium text-white">
          Address
        </label>
        <input
          id="address"
          name="address"
          value={placeData.address}
          onChange={(e) => { setPlaceData({ ...placeData, address: e.target.value }) }}
          className="bg-slate-800 text-white rounded-md p-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <Tag tags={placeData.tags} setTags={(tags) => setPlaceData({ ...placeData, tags })} />
      </div>

      <button onClick={handleSubmit} className="bg-cyan-500 text-white rounded-md p-2 mt-4">
        Save
      </button>
    </form>
  )
};
