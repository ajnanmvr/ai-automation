import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";

const useSubscription = () => {
  return useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      const { data } = await authClient.customer.state();
      return data;
    },
  });
};

export const useHasActiveSubsciption = () => {
  const { data: customerState, isLoading, ...rest } = useSubscription();

  const hasActiveSubsciption =
    customerState?.activeSubscriptions &&
    customerState.activeSubscriptions.length > 0;

  return {
    hasActiveSubsciption,
    subsciptions: customerState?.activeSubscriptions?.[0],
    isLoading,
    ...rest,
  };
};
