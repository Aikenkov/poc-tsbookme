export type BookEntity = {
    id: number;
    name: string;
    image: string;
    category_id: number;
};

export type Book = Omit<BookEntity, "id">;
