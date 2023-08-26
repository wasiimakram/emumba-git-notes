export interface ApiResponse {
    error: string | null;
    success: boolean;
    data: {};
    status: any;
    errors: string | null;
    successMessage: string;
}
export interface AddFormValues {
    description: string;
    files: Array<{
        fileName: string;
        content: string;
    }>;
}