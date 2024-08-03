import { FC } from "react"

import './ui/styles.css'

const InfoCard:FC<{keyVal:string,value:string}> = (props) => {
    return (
        <div className="info-card pt-10 l-text">
            <strong className="key-wrapper ">{props.keyVal}: </strong>
            <div className="value-wrapper ">{props.value}</div>
        </div>
    )
}

export default InfoCard