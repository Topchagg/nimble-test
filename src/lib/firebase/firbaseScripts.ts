import { v4 as uuidv4 } from 'uuid';

import { storage } from './firebase';
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage'

export async function downloadImgTo(img:File, folderName:string) {
    const imgRef = ref(storage, folderName + uuidv4());
    await uploadBytes(imgRef, img);
    const imgURL = await getDownloadURL(imgRef);
    return imgURL
}