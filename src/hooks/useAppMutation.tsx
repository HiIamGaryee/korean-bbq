import {
  useMutation,
  UseMutationOptions,
  MutationFunction,
} from "@tanstack/react-query";

export function useAppMutation<TData, TError, TVariables>(
  mutationFn: MutationFunction<TData, TVariables>,
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, "mutationFn">
) {
  return useMutation<TData, TError, TVariables>({
    ...options,
    mutationFn, // Provide the mutation function directly
    onSuccess: (data, variables, context, meta) => {
      console.log("Mutation success:", data);
      options?.onSuccess?.(data, variables, context, meta);
    },
    onError: (error, variables, context, meta) => {
      console.error("Mutation error:", error);
      options?.onError?.(error, variables, context, meta);
    },
  });
}
