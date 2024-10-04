"use client";
import { NewPlaceForm } from "@/components/forms/NewPlaceForm";
import { NextPage } from "next";

const PagesNew: NextPage = () => {
  return (
    <div className="w-full max-w-[450px] mx-auto">
      <div className="mx-3">
        <h1 className="text-2xl mb-4">Place information</h1>
        <NewPlaceForm />
      </div>
    </div>
  );
};

export default PagesNew;
