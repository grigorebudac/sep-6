export declare module Filter {
  interface Filter {
    with_people: FilterOption[];
    with_companies: FilterOption[];
    with_genres: FilterOption[];
  }

  interface FilterOption {
    id: number;
    name: string;
  }
}
