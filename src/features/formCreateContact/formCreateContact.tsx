import { InputField, ReactiveForm, useCreateForm,fieldSettings, setGlobalObject, useActionOnSubmit, formIsValid } from "reactive-fast-form"
import isAlpha from "validator/lib/isAlpha"
import isEmail from "validator/lib/isEmail"

const FormCreateContact = () => {

    const [form,setForm,trigger] = useCreateForm(['firstName','lastName','email'])

    const settings:fieldSettings = {
        validClass:"valid default",
        invalidClass:"invalid default",
    }

    useActionOnSubmit(() => {
        if(formIsValid(form, {'firstName':'lastname'})){
            console.log('crt')
        }else {
            console.log('inv')
        }
    },trigger)

    return (
        <>
            <ReactiveForm setObject={form} setFunc={setForm}>
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
        </>
    )
}

export default FormCreateContact