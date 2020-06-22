export class Items {
    data: {
        Page: {
            pageInfor: {
                total: number;
                currentPage: number;
                lastPage: number;
                hasNextPage: boolean;
                perPage: number
            },
            media: media[]
        }
    }
}

export class media {
    id: number;
    title: {
        romaji: string;
        image: 'https://pbs.twimg.com/profile_images/805651234698842112/uPSrYOHT.jpg'
    }
}
