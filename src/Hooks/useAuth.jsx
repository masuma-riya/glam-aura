import { useContext } from "react";

const useAuth = () => {
  const auth = useContext();
  return auth;
};

export default useAuth;
