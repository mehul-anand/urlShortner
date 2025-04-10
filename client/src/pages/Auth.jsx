import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useSearchParams } from "react-router";
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import { UrlState } from "@/context";

const Auth = () => {
  const [searchedParams] = useSearchParams();
  const {isAuthenticated,loading} = UrlState()
  const navigate = useNavigate()
  const userLink = searchedParams.get("shorten");
  useEffect(()=>{
    console.log(`isAuth:${isAuthenticated}`)
    if(isAuthenticated && !loading){
      navigate(`/dashboard?${userLink ? `shorten=${userLink}` : ""}`)
    }
  },[isAuthenticated,loading])
  return (
    <div className="mt-36 flex flex-col items-center gap-10">
      <h1 className="sm:text-5xl text-3xl font-extrabold">
        {userLink
          ? "Let's Login first.."
          : "Login / Sign Up"}
      </h1>
      <Tabs defaultValue="login" className="sm:w-[400px] px-3 w-11/12">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <Signup/>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
