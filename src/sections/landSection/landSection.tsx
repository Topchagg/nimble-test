import { ContactCard,LoadingItem,itemCard,useFetchData } from "../../shared/sharedApi";

import { CreateContactWidget } from "../../widgets/widgetApi";

import { token } from "../../shared/sharedApi";

import './ui/landSection.css'

const LandSection = () => {

    const url = 'https://cors-anywhere.herokuapp.com/https://live.devnimble.com/api/v1/contacts?created=desk';

    const {data,isLoaded,error} = useFetchData(url,token)

    if(isLoaded && data){
        return (
            <div className="content-wrapper">
                <div className="create-contact-widget-wrapper center">
                        <CreateContactWidget/>
                    </div>
                <div className="contact-grid-wrapper">
                    <div className="contacts-grid" >
                        {data?.['resources'].map((item:itemCard,index:number) => (
                            <div key={index}>
                                <ContactCard 
                                link={`/contact/${item.id}`}
                                id={item.id}
                                firstName={item?.['fields']?.['first name']?.[0]?.['value']}
                                lastName={item?.['fields']?.['last name']?.[0]?.['value']}
                                email={item?.['fields']?.['email']?.[0]?.['value']}
                                tags={item.tags}
                                image={item.avatar_url}
                                />
                            </div>
                        ))}
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

export default LandSection