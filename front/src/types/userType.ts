export type userType = {
    username: string;
    userpic: string;
    stats: {
        rating: number
    }
}

export const unloggedUser: userType = {
    username: "Anon",
    userpic: "",
    stats: {
        rating: 1000
    }
}
