import { tag } from "../types/contactCardType";

const getStringTags = (tags?:tag[]) => {
    if(tags !== undefined){
        let listToReturn:string[] = []
        tags.forEach((item) => {
            listToReturn.push(item.tag)
        })
        return listToReturn
    }
    return ['']
}

export default getStringTags