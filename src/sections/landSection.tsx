import ContactCard from "../shared/contactCard/contactCard";
import useFetchData from "../shared/customHooks/getCustomHooks";
import LoadingItem from "../shared/loadingItem/loadingitem";
import itemCard from "../shared/types/itemCardType";
import CreateContactWidget from "../widgets/createContactWidget/createContactWidget";

const url = 'https://cors-anywhere.herokuapp.com/https://live.devnimble.com/api/v1/contacts?created=desk';
const token = 'VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn'; 


import './ui/landSection.css'


const LandSection = () => {

    const {data,isLoaded,error} = useFetchData(url,token)

    if(isLoaded){
        return (
            <div className="content-wrapper">
                <CreateContactWidget/>
                <div className="contacts-grid">
                    {data?.['resources'].map((item:itemCard,index:number) => (
                        <div key={index}>
                            <ContactCard 
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
        )
    }else {
        return (
            <LoadingItem/>
        )
    }
}

export default LandSection