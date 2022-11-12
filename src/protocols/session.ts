export type Session = {
    id: number;
    user_id: number;
    token: string;
    active: boolean;
    created_at: Date;
};
