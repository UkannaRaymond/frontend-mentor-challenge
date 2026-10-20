import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { request } from "@/lib/api";
import type {
  ApiResponse,
  Extension,
  ExtensionStatus,
  Filter,
} from "@/lib/types";

export const extensionKeys = {
  all: ["extensions"] as const,
  list: (filter: Filter) => ["extensions", "list", filter] as const,
};

async function fetchExtensions(filter: Filter): Promise<Extension[]> {
  const params = new URLSearchParams({ pageSize: "100" });
  if (filter !== "all") params.set("status", filter);

  const res = await request<ApiResponse<{ extensions: Extension[] }>>(
    `/api/v1/extensions?${params}`,
  );
  return res.data.extensions;
}

export function useExtensions(filter: Filter) {
  return useQuery({
    queryKey: extensionKeys.list(filter),
    queryFn: () => fetchExtensions(filter),
    placeholderData: keepPreviousData,
  });
}

type Snapshot = [readonly unknown[], Extension[] | undefined][];

export function useToggleExtension() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: ExtensionStatus }) => {
      const body = new FormData();
      body.append("status", status);
      return request(`/api/v1/extensions/${id}`, { method: "PATCH", body });
    },

    onMutate: async ({ id, status }) => {
      // Stop in-flight refetches from overwriting the optimistic change
      await queryClient.cancelQueries({ queryKey: extensionKeys.all });

      // Remember every cached list so we can undo on failure
      const snapshot: Snapshot = queryClient.getQueriesData<Extension[]>({
        queryKey: extensionKeys.all,
      });

      for (const [key, data] of snapshot) {
        if (!data) continue;
        const listFilter = key[2] as Filter;

        const updated = data.map((extension) =>
          extension.id === id ? { ...extension, status } : extension,
        );

        // On "all" keep everything. On "active"/"inactive", drop whatever
        const next =
          listFilter === "all"
            ? updated
            : updated.filter((extension) => extension.status === listFilter);

        queryClient.setQueryData(key, next);
      }

      return { snapshot };
    },

    onError: (_error, _variables, context) => {
      context?.snapshot.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });
    },

    // Success or failure: re-sync with the server
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: extensionKeys.all }),
  });
}

export function useRemoveExtension() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      request(`/api/v1/extensions/${id}`, { method: "DELETE" }),

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: extensionKeys.all });

      const snapshot: Snapshot = queryClient.getQueriesData<Extension[]>({
        queryKey: extensionKeys.all,
      });

      for (const [key, data] of snapshot) {
        if (!data) continue;
        queryClient.setQueryData(
          key,
          data.filter((extension) => extension.id !== id),
        );
      }

      return { snapshot };
    },

    onError: (_error, _id, context) => {
      context?.snapshot.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });
    },

    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: extensionKeys.all }),
  });
}
