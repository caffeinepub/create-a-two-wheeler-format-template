import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { TwoWheeler } from "../../backend";
import { useActor } from "../../hooks/useActor";

const QUERY_KEY = ["twoWheelers"];

export function useTwoWheelers() {
  const { actor, isFetching: isActorFetching } = useActor();

  return useQuery<TwoWheeler[]>({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTwoWheelersByYear();
    },
    enabled: !!actor && !isActorFetching,
  });
}

export function useCreateTwoWheeler() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (record: TwoWheeler) => {
      if (!actor) throw new Error("Actor not initialized");
      await actor.addTwoWheeler(record);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useTwoWheeler(registrationNumber: string) {
  const { actor, isFetching: isActorFetching } = useActor();

  return useQuery<TwoWheeler>({
    queryKey: [...QUERY_KEY, registrationNumber],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.getTwoWheeler(registrationNumber);
    },
    enabled: !!actor && !isActorFetching && !!registrationNumber,
  });
}
