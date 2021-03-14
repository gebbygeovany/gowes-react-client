import {useState} from 'react'

export const useForm =(callback, initialState = {})=>{
    const [priceValues, setPriceValues] = useState(initialState)

    const onChange = (event) => {
        setPriceValues({ ...priceValues, [event.target.name]: event.target.value })
    }
    
    const onSubmit = event => {
        event.preventDefault()
        callback()
    }

    return {
        onChange,
        onSubmit,
        priceValues
    }
}