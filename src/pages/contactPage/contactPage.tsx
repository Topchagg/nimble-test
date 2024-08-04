import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { useFetchData,usePutRequest,getStringTags,LoadingItem } from '../../shared/sharedApi.ts'
import { FormAddTag } from '../../features/featuresApi.ts'

import './ui/contactPage.css'

const ContactPage = () => {

    const {id} = useParams()

    const urlGetUser = `https://cors-anywhere.herokuapp.com/https://live.devnimble.com/api/v1/contact/${id}`;
    const urlPutTags = `https://cors-anywhere.herokuapp.com/https://live.devnimble.com/api/v1/contacts/${id}/tags`;

    const token = 'VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn';

    const {data,isLoaded,error} = useFetchData(urlGetUser,token)

    const [tags,setTags] = useState<string[]>(getStringTags([]))

    const {loading,putError,putRequest} = usePutRequest(urlPutTags,token)

    const onSubmit = () => {
        if(data?.['resources']?.[0]?.['tags'].length !== tags.length){
            putRequest({tags: tags})
        }
    }

    useEffect(() => {
        setTags(getStringTags(data?.['resources']?.[0]?.['tags']))
    },[data])

    useEffect(() => {
        if(putError !== null){
            alert(putError)
        }
    },[putError])

    if(!loading &&  tags !== null && data !== null){
        return (
            <div className='content-wrapper'>
                <div className="contact-page-data-wrapper">
                    <div className="contact-page-image-wrapper">
                        <img src={data['resources'][0].avatar_url} className='image' alt="" />
                    </div>
                    <div className="contact-page-info-wrapper s-title">
                        <div className="contact-page-info-item ">Name: <span className="text-decoration">{data?.['resources']?.[0]['fields']?.['first name']?.[0]?.['value']}</span></div>
                        <div className="contact-page-info-item">Surname: <span className="text-decoration">{data?.['resources']?.[0]['fields']?.['last name']?.[0]?.['value']}</span></div>
                        <div className="contact-page-info-item">Email: <span className="text-decoration">{data?.['resources']?.[0]['fields']?.['email']?.[0]?.['value']}</span></div>
                    </div>
                </div>
                <div className="contact-page-tag-actions-wrapper mt-50">
                
                    <div className="tag-list-wrapper l-text">
                        Tags:
                        <div className="contact-page-tags-grid">
                            {tags?.map((item:string,index:number) => (
                                <div key={index} className='tag s-text'>{item}</div>
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
    }else {
        return (
            <LoadingItem/>
        )
    }
}

export default ContactPage