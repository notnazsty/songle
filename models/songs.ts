export interface Song {
    name: string;
    album: string;
    artists: string[];
    releaseDate: Date;
    coverImages: CoverImage[]
}

export interface CoverImage {
    width: number;
    url: string;
    height: number;
}

