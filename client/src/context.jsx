import { createContext, useContext, useEffect } from "react";
import useFetchHook from "./hooks/useFetchHook";
import { getCurrentUser } from "./db/apiAuth";

const UrlContext = createContext();
const UrlProvider = ({ children }) => {
  const {
    data: user,
    loading,
    hookFunc: fetchUser,
  } = useFetchHook(getCurrentUser);
  const isAuthenticated = user?.role === "authenticated";
  useEffect(() => {
    fetchUser();
  }, []);
  //   this will run everytime on every single page -> useEffect hook
  return (
    <UrlContext.Provider value={{user, fetchUser, loading, isAuthenticated}}>
      {children}
    </UrlContext.Provider>
  );
};

export const UrlState = () => {
  return useContext(UrlContext);
};

export default UrlProvider;
