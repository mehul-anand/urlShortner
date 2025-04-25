import React from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkIcon, LogOut } from "lucide-react";
import { UrlState } from "@/context";
import useFetchHook from "@/hooks/useFetchHook";
import { logout } from "@/db/apiAuth";
import { BarLoader } from "react-spinners";

const Header = () => {
  const navigate = useNavigate();
  const { user, fetchUser } = UrlState();
  const { loading, hookFunc: logoutFunc } = useFetchHook(logout);
  return (
    <>
      <nav className="py-4 px-4 mb-2 flex justify-between items-center">
        <Link to="/" className="flex items-center justify-center gap-4">
          {/* <img src="/logo.png" alt="logo" className="h-16 rounded-full" /> */}
          <LinkIcon className="h-14 w-10 text-white"/>
          <h2 className="text-4xl gradient-text">Url Shortner</h2>
        </Link>
        <div className="pr-12">
          {!user ? (
            <Button onClick={() => navigate("/auth")}>Login</Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                <Avatar>
                  <AvatarImage
                    src={user?.user_metadata?.profilePic}
                    className="object-contain"
                  />
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {user?.user_metadata?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to={"/dashboard"} className="flex gap-2 items-center justify-center">
                  <LinkIcon className="h-4 w-4" />
                    <span>My Links</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-400">
                  <LogOut className="h-4 w-4" />
                  <span
                    onClick={() => {
                      logoutFunc().then(() => {
                        fetchUser();
                        navigate("/");
                      });
                    }}
                  >
                    Logout
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
      {loading && <BarLoader width={"100%"} className="mb-4" color="#846eee" />}
    </>
  );
};

export default Header;
