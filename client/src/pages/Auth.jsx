import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router";
import Login from "@/components/Login";
import Signup from "@/components/Signup";

const Auth = () => {
  const [searchedParams] = useSearchParams();
  return (
    <div className="mt-36 flex flex-col items-center gap-10">
      <h1 className="text-5xl font-extrabold">
        {searchedParams.get("shorten")
          ? "Let's Login first.."
          : "Login / Sign Up"}
      </h1>
      <Tabs defaultValue="account" className="w-[400px]">
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
