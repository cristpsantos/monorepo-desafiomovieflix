import { User } from "./user";

export type MovieReviewsPage = {
    id: number;
    text: string;
    movieId: number
    user: User;
}