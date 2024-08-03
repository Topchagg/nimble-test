import { useCreateForm,ReactiveForm, InputField, setGlobalObject, useActionOnSubmit, formIsValid } from "reactive-fast-form"

import { v4 } from "uuid"

import { tag } from "../../shared/types/contactCardType"
import { Dispatch, FC, SetStateAction, useState } from "react"


interface formAddTag {
    setFunc:Dispatch<SetStateAction<tag[]>>,
    tags:tag[]
}

const FormAddTag:FC<formAddTag> = (props) => {

    const url = 'https://cors-anywhere.herokuapp.com/https://live.devnimble.com/api/v1/contact/66aa7dce662ccba0abc4e2b2/tags';
    const token = 'VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn';


    const [form,setForm,trigger] = useCreateForm(['tag'])

    useActionOnSubmit(() => {
        if(formIsValid(form) && props.tags.length <= 15){
            const tagToSet = {tag:form['tag'].value, id:v4()}
            props.setFunc([...props.tags, tagToSet])
        }else if (props.tags.length > 15){
            alert('Maximum of tags')
        }
    },trigger)

    return (
        <>
            <ReactiveForm setObject={form} setFunc={setForm} >
                 {!form['tag'].isValid && <>Tag can`t be shorter than 3 and longer than 15 symbols</>}
                <div>
                    <InputField 
                    name="tag" 
                    min={3}
                    max={15} 
                    isTrigger 
                    invalidClass="invalid default p-10" 
                    validClass="valid default p-10" 
                    placeholder="Tag"
                    resetAfterSubmit
                    />
                </div>
            </ReactiveForm>
            <button onClick={() => setGlobalObject(setForm)} className="btn mt-5 s-text">Add tag</button>
        </>
    )
}

export default FormAddTag