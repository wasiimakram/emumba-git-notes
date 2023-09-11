import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getHomeGist } from "../home/actions";
import { createGist, deleteGist, getMyGist, getStarGists, starGist, unStarGist } from "./actions";
import { message } from "antd";
import { GistData } from "../../common/typings/app";


export function useMyGist(page: number, perPage: number) {
    return useQuery(['my-gists'], () => getMyGist({ page, perPage }), {
        keepPreviousData: true,
    });
}
export function useStarGists(page?: number, perPage?: number) {
    return useQuery(
        ['star-gists'], // key
        () => getStarGists({ page, perPage }), // Action
        {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            keepPreviousData: true,
            staleTime: Infinity,
            cacheTime: Infinity,
        } // Config
    );
}

export function useStarGistMutation(
    gistId: string
) {
    const queryClient = useQueryClient();
    return useMutation(() => starGist(gistId), {
        onSuccess(data) {
            message.success('Gist Starred Successfully!');
        },
        onSettled: () => {
            const gistData: GistData[] | undefined = queryClient.getQueryData([
                'gists',
            ]);
            const myGistData: GistData[] | undefined = queryClient.getQueryData([
                'my-gists'
            ]);
            let newStarData = null;
            if (gistData?.find((item) => item.id === gistId)) {
                newStarData = gistData.find((item) => item.id === gistId);
            } else if (myGistData?.find((item) => item.id === gistId)) {
                newStarData = myGistData.find((item) => item.id === gistId);
            }
            const starredGists: GistData[] | undefined = queryClient.getQueryData([
                'star-gists',
            ]);
            console.log(newStarData, starredGists);
            queryClient.setQueryData(
                ['star-gists'],
                starredGists ? [newStarData, ...starredGists] : [newStarData]
            );
        },
    });
}
export function useUnStarGistMutation(
    gistId: string
) {
    const queryClient = useQueryClient();
    return useMutation(() => unStarGist(gistId), {
        onSuccess(data) {
            message.success('Gist Un-Starred Successfully!');
        },
        onSettled: () => {
            const gistData: GistData[] | undefined =
                queryClient.getQueryData(["star-gists"]);
            const userGists = gistData?.filter((gistData) => gistData.id !== gistId);

            queryClient.setQueryData(["star-gists"], userGists);
        },
    });
}

export const useDeleteGist = (
    gistId: string | undefined
) => {
    const queryClient = useQueryClient();

    return useMutation(() => deleteGist(gistId), {
        onSuccess: () => {
            message.success('Gist Deleted Successfully!');
        },
        onSettled: () => {
            const gistData: GistData[] | undefined =
                queryClient.getQueryData(["my-gists"]);
            const starData: GistData[] | undefined =
                queryClient.getQueryData(["star-gists"]);
            const userGists = gistData?.filter((gistData) => gistData.id !== gistId);
            const updatedStar = starData?.filter((gistData) => gistData.id !== gistId);

            queryClient.setQueryData(['my-gists'], userGists);
            queryClient.setQueryData(['star-gists'], updatedStar);
        },
    });
};