export interface name_tags {
    id: string,
    length: number,
    name: string,
    offset: number
}

export interface comment_data_data {
    created_time: string,
    from: {
        name: string,
        id: string
    },
    message: string,
    id: string
}

export interface like_data_data {
    id: string,
    name: string,
}

export interface comment_data {
    data: Array<comment_data_data>
}

export interface like_data {
    data: Array<like_data_data>
}

export interface EachPostField {
    picture: string,
    name: string,
    name_tags: Array<name_tags>,
    comments: comment_data,
    likes: like_data,
    id: string,
    created_time: string,
    alt_text: string,
}