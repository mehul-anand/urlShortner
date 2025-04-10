import {
  CalendarClockIcon,
  Copy,
  Download,
  Link2Icon,
  LinkIcon,
  SquareArrowOutUpRightIcon,
  Trash2Icon,
} from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { Button } from "./ui/button";

function LinkCard({ url, fetchUrls }) {
  return (
    <div className="flex flex-col md:flex-row gap-5 border p-4 rounded-lg bg-transparent">
      <img
        src={url?.qr}
        alt="qr-code"
        className="h-32 object-contain ring-4 ring-[#846eee] self-start"
      />
      <Link to={`/link/${url?.id}`} className="flex flex-col sm:gap-2 gap-1">
        <div className="flex gap-2 underline items-center">
          <span>
            <SquareArrowOutUpRightIcon />
          </span>
          <p className="text-xl font-extrabold cursor-pointer">{url?.title}</p>
        </div>
        <div className="flex gap-2 items-center">
          <span>
            <LinkIcon />
          </span>
          <span className="text-lg text-[#846eee] font-bold hover:underline">
            https://git.new/{url?.custom_url ? url?.custom_url : url?.short_url}
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <span>
            <Link2Icon />
          </span>
          <span className="hover:underline cursor-pointer">
            {url?.destination_url}
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <span>
            <CalendarClockIcon />
          </span>
          <span className="hover:underline cursor-pointer font-extralight text-sm">
            {new Date(url?.created_at).toLocaleString()}
          </span>
        </div>
      </Link>
      <div className="flex gap-2 ml-auto">
        <Button>
          <Copy />
        </Button>
        <Button>
          <Download />
        </Button>
        <Button>
          <Trash2Icon />
        </Button>
      </div>
    </div>
  );
}

export default LinkCard;
