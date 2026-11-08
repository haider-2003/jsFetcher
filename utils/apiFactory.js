import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../config/queryClient";
import axios from "axios";

export function apiFactory({ endpoint, entityName }) {
  const QueryKey = {
    all: () => [entityName],
    list: (filters) => [entityName, filters],
    ById: (id) => [entityName, id],
  };
  const useGetList = (filters) =>
    useQuery({
      queryKey: QueryKey.list(filters),
      queryFn: async () => {
        const params = new URLSearchParams(filters);
        const response = await axios.get(endpoint, {
          params,
        });
        return response.data;
      },
    });

  const useGetById = (id) =>
    useQuery({
      queryKey: QueryKey.ById(id),
      queryFn: async () => {
        const response = await axios.get(`${endpoint}/${id}`);
        return response.data;
      },
    });

  const useCreate = () =>
    useMutation({
      mutationFn: async (data) => {
        const response = await axios.post(endpoint, data);
        return response.data;
      },
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: QueryKey.all(),
        }),
    });

  const useUpdate = () =>
    useMutation({
      mutationFn: async ({ data, id }) => {
        const response = await axios.put(`${endpoint}/${id}`, data);
        return response.data;
      },
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: QueryKey.all(),
        }),
    });

  const useDelete = () =>
    useMutation({
      mutationFn: async (id) => {
        const response = await axios.delete(`${endpoint}/${id}`);
        return response.data;
      },
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: QueryKey.all(),
        }),
    });

  return {
    useGetList,
    useGetById,
    useCreate,
    useUpdate,
    useDelete,
  };
}
