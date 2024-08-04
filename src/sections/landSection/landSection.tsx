import { useEffect, useState } from "react";

import { ContactCard,LoadingItem,itemCard,useFetchData } from "../../shared/sharedApi";

import { CreateContactWidget } from "../../widgets/widgetApi";

import { token } from "../../shared/sharedApi";

import './ui/landSection.css'


const LandSection = () => {

    const url = 'https://cors-anywhere.herokuapp.com/https://live.devnimble.com/api/v1/contacts?sort=created:desc';

    const {data,isLoaded,error} = useFetchData(url,token)
    const [localData,setLocalData] = useState<any>() 
    // Я тут уже начал выдумывать дичь всякую, но мне кажется, если бы
    // Сервер возвращал полностью новый созданный объект, можно было бы относительно локально сделать динамическое отображение
    // новосозданных Элементов, но т.к я получаю с сервера обрезок без айдишки, это выходит чисто оболочка которая более наглядно показывает, что объект
    // реально был создан, но офк перейти на неё никак из-за отсутсвия айдишникка, мне кажется всё же можно сделать возвращение с сервака
    // Полностью созданного объекта, а не только тех данных, которые отправил клиент (Вероятно я ошибаюсь)
    // Если кинуть изображение, то кажется то что объект реальный, но из-за отсутсвия серверного айди, нажав на это просто выдаст ошибку
    // Может я как-то не так респонс обрабатывал, и всё таки возвращается действительно новосозданный объект который обработал уже сервак
    // А может и нет, я хз короче )) Но я оставлю эту фичу, выглядит прикольно , что сразу видно, что человек реально что-то создал 
    // + работает без перезагрузки клиента (Я типы ниже не прокинул, т.к делаю это уже в час ночи, но суть понятна в целом, надеюсь не оцените это за минус)
    // p.s Через редакс и зустанд это можно было бы сделать более компактней, но юзать зустанд а уж тем более редакс на таком маленьком проектике толку мало :)


    useEffect(() => {
        if(data !== undefined){
            setLocalData(data?.['resources'])
        }
    },[data])

    if(isLoaded && localData){
        return (
            <div className="content-wrapper">
                <div className="create-contact-widget-wrapper center">
                        <CreateContactWidget data={localData} setFunc={setLocalData}/>
                    </div>
                <div className="contact-grid-wrapper">
                    <div className="contacts-grid" >
                        {localData?.map((item:itemCard,index:number) => (
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