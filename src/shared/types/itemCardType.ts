import { tag } from "./contactCardType"

interface el {
    value:string
}

interface itemCard {
    avatar_url:string,
    fields: Record<string,el[]>,
    tags: tag[],
    id:string
  }

export default itemCard