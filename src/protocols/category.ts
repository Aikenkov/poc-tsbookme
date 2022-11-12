export type CategoryEntity = {
    id: number;
    name: string;
};

export type Category = Omit<CategoryEntity, "id">;
