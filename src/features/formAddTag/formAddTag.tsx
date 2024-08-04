import { Dispatch, FC, SetStateAction } from "react"

import { useCreateForm,ReactiveForm, InputField, setGlobalObject, useActionOnSubmit, formIsValid } from "reactive-fast-form"

interface formAddTag {
    setFunc:Dispatch<SetStateAction<string[]>>,
    tags:string[]
}

const FormAddTag:FC<formAddTag> = (props) => {

    const [form,setForm,trigger] = useCreateForm(['tag'])

    useActionOnSubmit(() => {
        if(formIsValid(form) && props.tags.length <= 15){
            props.setFunc([...props.tags,form['tag'].value])
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
                    invalidClass="invalid default-field p-10" 
                    validClass="valid default-field p-10" 
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