import { useContext } from "react";
import useSWR from "swr";

import { AuthContext } from "@/contexts/AuthContext";
import { Fetch } from "@/services/api";

export function useFetch<Data = any, Error = any>(url: string, refreshInterval: number = 0) {
    const { session } = useContext(AuthContext);
    const { data, error, mutate, isLoading, isValidating } = useSWR<Data, Error>(typeof session?.token != "undefined" ? url : null, async url => {
        Fetch.defaults.headers.common["Authorization"] = `Bearer ${session?.token}`;
        const response = await Fetch.get(url);
        return response.data;
    }, { refreshInterval: refreshInterval });

    return { data, error, mutate, isLoading, isValidating };
}