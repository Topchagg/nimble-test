import { useEffect, useState,FC } from 'react'

import InfoCard from '../infoCard/infoCard'
import contactCardType from '../types/contactCardType'

import './ui/styles.css'

const ContactCard:FC<contactCardType> = (props) => {

    const [isHover, setIsHover] = useState<boolean>(false)
    const [isHugeTagList,setIsHugeTagList] = useState(false)
    const [styles,setStyles] = useState<string>('')
    const [workTagList,setWorkTagList] = useState(props.tags)


    useEffect(() => {
        if(props.tags.length > 8){
            setWorkTagList(props.tags.slice(0,8))
            setIsHugeTagList(true)
        }
    },[])

    useEffect(() => {
        const styles = isHover ? "card-container card-container__hover" : "card-container"
        setStyles(styles)
    },[isHover])

    return (
        <div className='card' onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
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
                            <span key={index} className='tag mt-5'>{item.tag}</span>
                        ))} {isHugeTagList && <div className='xl-text'>...</div>}
                    </div>
                </div>
            </div>
            <div className="del-contact-btn xl-text">
                Delete this contact
            </div>
        </div>
    )
}

export default ContactCard