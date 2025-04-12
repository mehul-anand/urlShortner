import { storeClicks } from "@/db/apiClicks";
import { getLongUrl } from "@/db/apiUrls";
import useFetchHook from "@/hooks/useFetchHook";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { BarLoader } from "react-spinners";

const Redirect = () => {
  const { id } = useParams();
  const {
    loading: loadingRedirect,
    data,
    hookFunc: redirectFunc,
  } = useFetchHook(getLongUrl, id);
  const { loading: loadingStats, hookFunc: storeFunc } = useFetchHook(
    storeClicks,
    {
      id: data?.id,
      destinationUrl: data?.destination_url,
    }
  );

  useEffect(() => {
    redirectFunc();
  }, []);
  useEffect(() => {
    if (!loadingRedirect && data) {
      storeFunc();
    }
  }, [loadingRedirect]);

  if(loadingRedirect || loadingStats){
    return(
      <>
      <BarLoader width={"100%"} color="#846eee" />
      <br />
      Redirecting...
      </>
    )
  }
  return null
};

export default Redirect;
