import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import FullAccordion from "@/components/FullAccordion";
import { useNavigate } from "react-router";

const Landing = () => {
  const [inputUrl, setInputUrl] = useState("");
  const navigate = useNavigate();
  const handleUrl = (e) => {
    //e -> parameter
    e.preventDefault();
    //we do this with form inputs to prevent any further behaviour from the browser
    if (inputUrl) {
      navigate(`/auth?shorten=${inputUrl}`);
    }
  };
  return (
    <div className="flex flex-col items-center px-3">
      <h2 className="m-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl gradient-text text-center font-extrabold">
        Best URL shortner out there
      </h2>
      <form
        onSubmit={handleUrl}
        className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2"
      >
        <Input
          type="url"
          placeholder="Enter your URL"
          onChange={(e) => {
            setInputUrl(e.target.value);
          }}
          // takes the event (e) as the parameter
          className="h-full flex-1 p-4"
        />
        <Button className="h-full" type="submit">
          Shorten
        </Button>
      </form>
      <img
        src="/banner.jpg"
        alt="banner"
        className="sm:w-2/3 w-full my-11 border rounded-3xl"
      />
      <div className="my-10 sm:w-2/4 w-full">
        <h3 className="m-2 text-xl sm:text-2xl text-white text-center font-extrabold">
          FAQs
        </h3>
        <FullAccordion />
      </div>
    </div>
  );
};

export default Landing;
