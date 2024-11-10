interface INameContext {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    searchResults: IName[];
    setSearchResults: React.Dispatch<React.SetStateAction<IName[]>>;
    names: IName[];
    setNames: React.Dispatch<React.SetStateAction<IName[]>>;
    nameDetail: IName,
    setNameDetail: React.Dispatch<React.SetStateAction<IName>>;
    handleSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
    handleEdit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
    handleDelete: (name: string) => void;
    error: string | null;
    isLoading: boolean;
}