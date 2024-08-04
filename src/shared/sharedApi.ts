import ContactCard from "./ui/contactCard/contactCard";
import InfoCard from "./ui/infoCard/infoCard";
import LoadingItem from "./ui/loadingItem/loadingitem";

export {ContactCard,InfoCard,LoadingItem}
// tsx

import deleteContact from "./functions/deleteContact";
import getStringTags from "./functions/getStingTags";

import useFetchData from "./customHooks/getCustomHooks";
import usePostRequest from "./customHooks/postCustomHook";
import usePutRequest from "./customHooks/putCustomHook";

export {deleteContact,getStringTags,useFetchData,usePostRequest,usePutRequest}

// functions/customHooks


import contactCardType from "./types/contactCardType";
import itemCard from "./types/itemCardType";

export type {contactCardType,itemCard}

// types
const token = 'VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn'; 


export {token}