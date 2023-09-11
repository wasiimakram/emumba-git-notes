import { GistData } from "../typings/app";

export function isStaredGist(array: GistData[] | undefined, specificId: string): boolean {
    console.log('array', array);
    return array ? array.some(item => item.id === specificId) : false;
}