import { useEffect, useState } from 'react'
import FormAddTag from '../../features/formAddTag/formAddTag'
import { tag } from '../../shared/types/contactCardType'
import useFetchData from '../../shared/customHooks/getCustomHooks'

import './ui/contactPage.css'
import usePutRequest from '../../shared/customHooks/putCustomHook'



const ContactPage = () => {

    const urlGetTags = 'https://cors-anywhere.herokuapp.com/https://live.devnimble.com/api/v1/contact/66aa956d662ccba0abc4e345';
    const urlPutTags = 'https://cors-anywhere.herokuapp.com/https://live.devnimble.com/api/v1/contact/66aa956d662ccba0abc4e345/tags';

    const token = 'VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn';

    const {data,isLoaded,error} = useFetchData(urlGetTags,token)

    const [tags,setTags] = useState<tag[]>(data?.['resources']?.[0]?.['tags'])

    const {putRequest} = usePutRequest(urlPutTags,token)

    const onSubmit = () => {
        if(data?.['resources']?.[0]?.['tags'].length !== tags.length){
            const newData = data
            newData['resources'][0]['tags'] = tags
            putRequest(data)
        }
    }


    useEffect(() => {
        setTags(data?.['resources']?.[0]?.['tags'])
    },[data])

    if(isLoaded &&  tags !== undefined){
        return (
            <div className='content-wrapper'>
                <div className="contact-page-data-wrapper">
                    <div className="contact-page-image-wrapper">
                        <img src="avatarimg.png" className='image' alt="" />
                    </div>
                    <div className="contact-page-info-wrapper s-title">
                        <div className="contact-page-info-item ">Name: <span className="text-decoration">{data?.['resources']?.[0]['fields']?.['first name']?.[0]?.['value']}</span></div>
                        <div className="contact-page-info-item mt-50">Surname: <span className="text-decoration">{data?.['resources']?.[0]['fields']?.['last name']?.[0]?.['value']}</span></div>
                        <div className="contact-page-info-item mt-50">Email: <span className="text-decoration">{data?.['resources']?.[0]['fields']?.['email']?.[0]?.['value']}</span></div>
                    </div>
                </div>
                <div className="contact-page-tag-actions-wrapper mt-50">
                    
                    <div className="tag-list-wrapper l-text">
                        Tags:
                        <div className="contact-page-tags-grid">
                            {tags.map((item:tag,index:number) => (
                                <div key={index} className='tag'>{item.tag}</div>
                            ))}
                        </div>
                    </div>

                    <div className="create-tag-form-wrapper">
                        <FormAddTag setFunc={setTags}  tags={tags} />
                        <button className='btn s-text' onClick={() => onSubmit()}>Submit tags</button>
                    </div> 
                </div>
            </div>
        )
    }
}

export default ContactPage