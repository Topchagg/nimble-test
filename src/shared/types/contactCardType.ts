interface tag {
    id:string,
    tag:string,
}

interface contactCardType {
    firstName:string,
    lastName:string,
    tags:tag[],
    email:string,
    image:string
}

export default contactCardType