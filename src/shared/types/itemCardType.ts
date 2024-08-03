import contactTagType from "./contactTagType"

interface el {
    value:string
}

interface itemCard {
    avatar_url:string,
    fields: Record<string,el[]>,
    tags: contactTagType[]
  }

export default itemCard