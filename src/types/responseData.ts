/**
 * This interface defines the response data of a table.
 * 
 * Fields:
 * - status: A string that indicates the status of the response ("success" for success, "fail" for failure).
 * - data: An array of objects or a single object representing the data of the table.
 * - total: The total number of records in the table.
 * - totalPages: The total number of pages of the table.
 * - currentPage: The current page of the table.
 */
export interface ResponseData {
    status: string;
    data: any[] | undefined;
    total: number | undefined;
    totalPages?: number;
    currentPage?: number;
}