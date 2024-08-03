import { InputField, ReactiveForm, useCreateForm,fieldSettings, setGlobalObject, useActionOnSubmit, formIsValid } from "reactive-fast-form"
import isAlpha from "validator/lib/isAlpha"
import isEmail from "validator/lib/isEmail"
import usePostRequest from "../../shared/customHooks/postCustomHook";
import { v4 } from "uuid";
import { useEffect } from "react";
import LoadingItem from "../../shared/loadingItem/loadingitem";

const FormCreateContact = () => {

    const url = 'https://cors-anywhere.herokuapp.com/https://live.devnimble.com/api/v1/contact';
    const token = 'VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn';

    const [form,setForm,trigger] = useCreateForm(['firstName','lastName','email'])

    const {loading,data,error,postRequest} = usePostRequest(url,token)

    const settings:fieldSettings = {
        validClass:"valid default",
        invalidClass:"invalid default",
        resetAfterSubmit:true
    }

    useActionOnSubmit(() => {
        if(formIsValid(form, {'firstName':'lastname'})){

            const data = {
                record_type: 'person',
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
                
            
                
            postRequest(data)
        }else {

        }
    },trigger)

    return (
        <>
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
                    {!form['email'].isValid && <>Please! Be sure that u`ve correctly entered ur email!</>}
                    <InputField name="email" validFunc={isEmail} isTrigger {...settings} placeholder="Email"/>
                </div>
            </ReactiveForm> 
            <button onClick={() => setGlobalObject(setForm)} className="btn s-text mt-5">**Create new contact**</button>
            {data && <>Succesfully created!</>} {error && <>error</>}
        </>
    )
}

export default FormCreateContact