interface IName {
    _id: string
    name: string,
    nameInEnglish: string,
    description: string,
    gender: string,
    origin?: string,
    literatureEvidence?: string,
    epigraphEvidence?: string,
}

interface INameContext {
    names: IName[];
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    searchNameResults: IName[];
    isLoading: boolean;
    error: string;
    addName: (nameDetail: IName) => void;
    updateName: (nameDetail: IName) => void;
    deleteName: (name: string) => void;
}