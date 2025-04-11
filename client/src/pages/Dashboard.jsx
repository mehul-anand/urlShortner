import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { BarLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchSlash } from "lucide-react";
import useFetchHook from "@/hooks/useFetchHook";
import { getUrls } from "@/db/apiUrls";
import { UrlState } from "@/context";
import { getClicksForUrls } from "@/db/apiClicks";
import LinkCard from "@/components/LinkCard";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = UrlState();
  const {
    loading: loadingUrls,
    error,
    data: urls,
    hookFunc: urlFunc,
  } = useFetchHook(getUrls, user.id);
  const {
    loading: loadingClicks,
    data: clicks,
    hookFunc: clicksFunc,
  } = useFetchHook(
    getClicksForUrls,
    urls?.map((url) => url.id)
  );
  useEffect(() => {
    urlFunc();
  }, []);

  useEffect(() => {
    if (urls?.length) {
      clicksFunc();
    }
  }, [urls]);

  const searchedUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 px-3">
      {(loadingClicks || loadingUrls) && (
        <BarLoader width={"100%"} color="#846eee" />
      )}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent><p>{urls?.length}</p></CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent><p>{clicks?.length}</p></CardContent>
        </Card>
      </div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-extrabold gradient-text p-2">My Links</h1>
        <Button>Create Link</Button>
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="Search Links"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchSlash className="absolute top-2 right-2 p-[2px]" />
      </div>
      {error && <Error message={error?.message} />}
      {(searchedUrls || []).map((url,i)=>{
        return <LinkCard key={i} url={url} fetchUrls={urlFunc} />
      })}
    </div>
  );
};

export default Dashboard;
