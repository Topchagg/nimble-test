import { useEffect, useState,FC } from 'react'

import { Link } from 'react-router-dom'

import InfoCard from '../infoCard/infoCard'
import contactCardType from '../../types/contactCardType'
import LoadingItem from '../loadingItem/loadingitem'

import deleteContact from '../../functions/deleteContact'

import { token } from '../../sharedApi'

import './ui//contactCard.css'


const ContactCard:FC<contactCardType> = (props) => {


    const [isHover, setIsHover] = useState<boolean>(false)
    const [isHugeTagList,setIsHugeTagList] = useState(false)
    const [styles,setStyles] = useState<string>('')
    const [workTagList,setWorkTagList] = useState(props.tags)
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const [isDeleted,setIsDeleted] = useState<boolean>(false)

    async function onDelete () {
        setIsLoading(true)
        await deleteContact(props.id,token,setIsDeleted)
        setIsLoading(false)
    }


    useEffect(() => {
        if(props.tags.length > 5){
            setWorkTagList(props.tags.slice(0,5))
            setIsHugeTagList(true)
        }
    },[])

    useEffect(() => {
        const styles = isHover ? "card-container card-container__hover" : "card-container"
        setStyles(styles)
    },[isHover])

    if(!isDeleted) {
        return (
            <div className='card' onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                {isLoading && <LoadingItem/>}
                <Link to={props.link}>
                <div className={styles}>
                    <div className="avatar-wrapper">
                        <img src={props.image} className='image' alt="" />
                    </div>
                    <div className="info-contact-wrapper">
                        <InfoCard keyVal='Name' value={props.firstName}/>
                        <InfoCard keyVal='Surname' value={props.lastName}/>
                        <InfoCard keyVal='Email' value={props.email}/>
                        <hr />
                        <div className="tags-wrapper pt-10">
                            {workTagList.map((item,index:number) => (
                                <span key={index} className='contact-card-tag'>{item.tag}</span>
                            ))} {isHugeTagList && <div className='s-text ml-5'>...</div>}
                        </div>
                    </div>
                </div>
                </Link>
                <div className="del-contact-btn xl-text" onClick={onDelete}>
                    Delete this contact
                </div>
            </div>
        )
    }
}

export default ContactCard