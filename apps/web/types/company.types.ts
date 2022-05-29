export declare module Company {
  interface Company {
    id: number;
    logo_path: string;
    name: string;
  }

  export interface GetCompaniesResponse {
    page: number;
    results: Company[];
    total_pages: number;
    total_results: number;
  }
}
