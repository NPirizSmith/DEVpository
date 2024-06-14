import { Session as NextAuthSession } from 'next-auth';

export interface Session extends NextAuthSession {
  isNewUserChecked?: boolean;
}

export interface UserSession {
    id: string;
    name?: string;
    image?: string;
}

export interface AddFavButtonProps {
    postId: string;
    isFavorite: boolean;
    favCount: number;
    closeDropdown?: () => void;
}


export type Post = {
    id: string;
    title: string;
    description?: string | null;
    url: string;
    authorId?: string | null;
    generalRating?: number | null;
    author?: User | null;
    userFavorites: User[];
    tags: Tag[];
    logo?: string,
    preview?: string
  };
  
  export type User = {
    id: string;
    name?: string | null;
    image?: string | null;
    createdAt: Date;
    updatedAt: Date;
    favoritePosts: Post[];
    posts: Post[];
  };
  
  export type Tag = {
    id: string;
    name: string;
    posts: Post[];
    color: string;
  };

  export type Rating = {
    id: string;
    value: number;
    userId: string;
    postId: string;
  };

