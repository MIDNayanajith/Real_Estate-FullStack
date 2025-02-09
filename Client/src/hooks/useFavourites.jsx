import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { getAllFav } from "../utils/api";
import UserDetailContext from "../Context/UserDetailsContext";

const useFavourites = () => {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const queryRef = useRef();
  const { user } = useAuth0();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: "allFavourites",
    queryFn: () => getAllFav(user?.email, userDetails?.token),
    onSuccess: (data) =>
      setUserDetails((prev) => ({ ...prev, favourites: data })),
    enabled: user !== undefined,
    staleTime: 30000,
  });
  queryRef.current = refetch;

  useEffect(() => {
    queryRef.current && queryRef.current();
  }, [userDetails?.token]);

  return { data, isLoading, isError, refetch };
};
export default useFavourites;
