export interface ApiResponse {
    error: string | null;
    success: boolean;
    data: [];
    status: any;
    errors: string | null;
    successMessage: string;
    staredId: string;
}
export interface AddFormValues {
    description: string;
    files: Array<{
        fileName: string;
        content: string;
    }>;
}
export interface GistUpdate {
    id: string,
    updatedContent: {
        gist_id: string;
        description: string | undefined;
        files: {
            [fileName: string]: {
                content: string;
            }
        }
    }

}
export interface CreateGist {
    description: string,
    files: {
        [fileName: string]: {
            content: string;
        }
    }
}
export type GistState = {
    publicGist: any;
    gistDetails: Record<string, any>;
    loader: boolean;
    page: number;
    perPage: number;
    total: number;
    pageLayout: 'listing' | 'grid';
    isStarred: boolean;
    isForked: boolean;
    starCount: number;
    forkCount: number;
    isStarredArr: string[]
    isForkedArr: string[]

};
export type ProfileGistState = {
    myGists: any;
    loader: boolean;
    page: number;
    perPage: number;
    total: number;
    isStarred: boolean;
    isForked: boolean;
    starCount: number;
    forkCount: number;

};
export interface GistProps {
    id: `${string}/${string}`;
    file: string;
}
export interface GetGistArgs {
    page: number;
    perPage: number;
}
