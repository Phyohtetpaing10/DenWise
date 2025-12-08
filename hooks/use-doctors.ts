"use client";

import { createDoctor, getDoctors, updateDoctor } from "@/lib/actions/doctors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetDoctors = () => {
  const result = useQuery({
    queryKey: ["getDoctors"],
    queryFn: getDoctors,
  });

  return result;
};

export const useCreateDoctor = () => {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: createDoctor,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getDoctors"] }),
    onError: () => console.log("Error while creating doctor"),
  });

  return result;
};

export const useUpdateDoctor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDoctor,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getDoctors"] }),
    onError: () => console.log("Error while updating doctor"),
  });
};
