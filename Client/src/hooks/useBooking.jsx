import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { getAllBookings } from "../utils/api";
import UserDetailContext from "../Context/UserDetailsContext";

const useBooking = () => {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const queryRef = useRef();
  const { user } = useAuth0();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: "allBookings",
    queryFn: () => getAllBookings(user?.email, userDetails?.token),
    onSuccess: (data) =>
      setUserDetails((prev) => ({ ...prev, bookings: data })),
    enabled: user !== undefined,
    staleTime: 30000,
  });
  queryRef.current = refetch;

  useEffect(() => {
    queryRef.current && queryRef.current();
  }, [userDetails?.token]);

  return { data, isLoading, isError, refetch };
};
export default useBooking;
