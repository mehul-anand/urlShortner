import { Button } from "@/components/ui/button";
import { UrlState } from "@/context";
import { getSingleUrlClicks } from "@/db/apiClicks";
import { deleteUrl, getSingleUrl } from "@/db/apiUrls";
import useFetchHook from "@/hooks/useFetchHook";
import {
  CalendarClockIcon,
  Copy,
  Download,
  Link2Icon,
  LinkIcon,
  Trash2Icon,
} from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { BarLoader, BeatLoader } from "react-spinners";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Location from "@/components/Location";

function Link() {
  const { id } = useParams();
  const { user } = UrlState();
  const navigate = useNavigate();
  // const baseUrl = import.meta.env.BASE_URL
  const {
    loading: urlLoading,
    data: urlData,
    hookFunc: singleUrlFunc,
    error: urlError,
  } = useFetchHook(getSingleUrl, { id, user_id: user?.id });
  const {
    loading: clicksLoading,
    data: clicksData,
    hookFunc: clicksFunc,
    error: clicksError,
  } = useFetchHook(getSingleUrlClicks, id);

  const { loading: deleteLoading, hookFunc: deleteFunc } = useFetchHook(
    deleteUrl,
    id
  );

  useEffect(() => {
    singleUrlFunc();
  }, []);

  useEffect(() => {
    if (!urlError && urlLoading === false) {
      clicksFunc();
    }
  }, [urlError, urlLoading]);

  if (urlError) {
    navigate(`/dashboard`);
  }

  let dispLink = "";
  // let finalLink = ""
  if (urlData) {
    dispLink = urlData?.custom_url ? urlData?.custom_url : urlData?.short_url;
  }

  return (
    <div className="py-4 mx-6">
      {(urlLoading || clicksLoading) && (
        <BarLoader className="mb-4" width={"100%"} color="#846eee" />
      )}
      <div className="flex flex-col gap-8 sm:flex-row justify-between">
        <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
          <span className="gradient-text text-3xl font-bold hover:underline cursor-pointer">
            {urlData?.title}
          </span>
          <a
            href={`http://localhost:5173/${dispLink}`}
            target="_blank"
            className="text-xl underline flex justify-center items-center gap-2"
          >
            <LinkIcon />
            <p className="text-fuchsia-300">http://localhost:5173/{dispLink}</p>
          </a>
          <a
            href={urlData?.destination_url}
            target="_blank"
            className="text-xl underline flex justify-center items-center gap-2"
          >
            <Link2Icon />
            <p className="text-fuchsia-300">{urlData?.destination_url}</p>
          </a>
          <p className="text-l flex justify-center items-center gap-2">
            <CalendarClockIcon />
            <span>{new Date(urlData?.created_at).toLocaleString()}</span>
          </p>
          <div className="flex gap-2 ml-auto">
            <Button>
              <Copy />
            </Button>
            <Button>
              <Download />
            </Button>
            <Button onClick={() => deleteFunc()}>
              {deleteLoading ? (
                <BeatLoader size={5} color="#846eee" />
              ) : (
                <Trash2Icon />
              )}
            </Button>
          </div>
          <img
            src={urlData?.qr}
            alt="qr code"
            className="w-full self-center sm:self-start object-contain ring-2 rounded-sm p-1 ring-[#846eee]"
          />
        </div>
        <Card className="w-3/5">
          <CardHeader>
            <CardTitle className="text-2xl font-extrabold">
              Card Title
            </CardTitle>
          </CardHeader>
          {clicksData && clicksData?.length ? (
            <CardContent>
              <Card>
                <CardHeader>
                  <CardTitle>Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{clicksData?.length}</p>
                </CardContent>
              </Card>
              <div className="mt-10">
                <CardTitle>Location Data</CardTitle>
                <Location stats={clicksData}/>
                <CardTitle>Device Info</CardTitle>
              </div>
            </CardContent>
          ) : (
            <CardContent>
              {!clicksLoading ? "No stats yet" : "Loading stats"}
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}

export default Link;
