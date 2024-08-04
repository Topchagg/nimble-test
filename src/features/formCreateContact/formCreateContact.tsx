import { useEffect, useState } from "react";

import { InputField, ReactiveForm, useCreateForm,fieldSettings, setGlobalObject, useActionOnSubmit, formIsValid, ImageField, SelectField } from "reactive-fast-form"
import isAlpha from "validator/lib/isAlpha"
import isEmail from "validator/lib/isEmail"

import { usePostRequest } from "../../shared/sharedApi";

import {LoadingItem} from "../../shared/sharedApi";

import { deleteImg, downloadImgTo } from "../../lib/firebase/firbaseScripts";

import './ui/formCreateContact.css'

const FormCreateContact = () => {

    const url = 'https://cors-anywhere.herokuapp.com/https://live.devnimble.com/api/v1/contact';
    const token = 'VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn';

    const [form,setForm,trigger] = useCreateForm(['firstName','lastName','email','image','type'])
    const [preview, setPreview] = useState<string>()
    const [imageUrl,setImageUrl] = useState<string>()

    const {loading,data,error,postRequest} = usePostRequest(url,token)

    const settings:fieldSettings = {
        validClass:"valid default-field",
        invalidClass:"invalid default-field",
        resetAfterSubmit:true
    }

    useActionOnSubmit(async () => {
        if(formIsValid(form, {'firstName':'lastname'})){
            const img = await downloadImgTo(form['image'].value,'/image')
            setImageUrl(img)
            const data = {
                    avatar_url:img,
                    record_type: form['type'].value,
                    privacy: {
                    edit: null,
                    read: null,
                    },
                    owner_id: null,
                    fields: {
                        "email": [{
                            "value": form['email'].value,
                            "modifier":''
                        }],
                        "last name": [{
                            "value":form['lastName'].value,
                            "modifier":''
                        }],
                        "first name": [{
                            "value":form['firstName'].value,
                            "modifier":''
                        }],
                    }
    
                }     
                setPreview('')
                postRequest(data)
        }else {
            alert('1. Name or Lastname have to be filled, 2. Email is required field and have to be valid email value')
        }
    },trigger)

    useEffect(() => {
        if(form['image'].value !== undefined){
            const image:Blob = form['image'].value
                if(image){
                    const objectUrl = URL.createObjectURL(image)
                    setPreview(objectUrl)
                }
        }
        if(error !== null){
            if(typeof imageUrl  === 'string'){
                deleteImg(imageUrl)
            }
            alert(error)
        }
    },[form['image'].value,error])

    return (
        <>
        <div className="form-create-contact-wrapper">
            <ReactiveForm setObject={form} setFunc={setForm}>
                {loading && <LoadingItem/>}
                <div>
                    {!form['firstName'].isValid && <>Valid only alphabets!</>}
                    <InputField name="firstName" allowNull max={20} validFunc={isAlpha} {...settings} placeholder="Name"/>
                </div>
                <div>
                    {!form['lastName'].isValid && <>Valid only alphabets!</>}
                    <InputField name="lastName" allowNull max={20} validFunc={isAlpha} {...settings} placeholder="Surname"/>
                </div>
                <div>
                    {!form['email'].isValid && <div>Invalid email</div>}
                    <InputField name="email" validFunc={isEmail} isTrigger {...settings} placeholder="Email" type="email"/>
                </div>
                <div>
                    <ImageField name="image" maxBytes={10000000} id="image" updateOnChange/>
                </div>
                <div>
                    <SelectField name="type" classNameSelectField="create-contact-select-field mt-5" defaultValue="person">
                        <option value={'person'}>Person</option>
                        <option value={'company'}>Company</option>
                    </SelectField>
                </div>
            </ReactiveForm> 

            <label htmlFor="image">
                    <div className="create-contact-image-wrapper">
                        {preview && <img src={preview} className="image" alt="" /> || <div className="l-text">Image</div> } 
                    </div>
            </label>
        </div>
        <button onClick={() => setGlobalObject(setForm)} className="btn s-text mt-5 center">**Create new contact**</button>
            {data && <>Succesfully created!</>} {error && <div className="center">error</div>}
        </>
    )
}

export default FormCreateContact