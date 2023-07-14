import PredefinedTestQuestions from '../PredefinedTestQuestion/PredefinedTestQuestions';
import StaticTestQuestions from '../StaticTestQuestions/StaticTestQuestions';
import React, {useState, useEffect} from 'react'
import axios from 'axios';

const Form = () => {

    const [apiData, setApiData] = useState(null);
    const [isFormValid, setIsFormValid] = useState(true);
    const [formData, setFormData] = useState({
        testName:'',
        testType:'',
        totalQuestions:
        {
            predefinedQuestions:0,
            staticQuestions:0,
            totals:0
        },
        predefinedQuestions:
        {
            total:0,
        },
        dynamicQuestions:
        {
            total:0,
            
        }
    });

    function handleFormSubmission(e)
    {
        e.preventDefault();
        // console.log(formData, isFormValid)

        if(isFormValid)
        {
            console.log(formData)
            console.log(apiData)
            console.log("generate predefined questions here")

            // console.log(Object.values(formData.predefinedQuestions).slice(1,).map((element)=>
            // {
            //     Object.keys(element).map(item=>
            //     {
            //         apiData.filter(tech=>tech==item)
            //     })
            // }))

            return;
        }

        console.log(formData)

    } 

    useEffect(()=>
    {
        axios.get("http://localhost:8080/allQuestions")
        .then(({data})=>setApiData(data))
        .catch((err)=>{throw new Error(err)})

    },[])

    return (

        <form className='formContainer' onSubmit={handleFormSubmission}>

        <div className='formItem'>
            <label>Test Name </label>
            <input type='text' placeholder='Test paper Name here...'/>
        </div>  

        <div className='formItem'>
            <label>Test Type </label>
            <select>
            <option>Select Test Type </option>
            <option value={"A"}>A</option>  
            <option value={"B"}>B</option>  
            <option value={"C"}>C</option>  
            </select>
        </div>

        <div className='formItem'>
            <label>Total question : </label>
            <input type='number' placeholder='Type total number of question'/>
        </div>

        <PredefinedTestQuestions formData={formData} setFormData={setFormData} apiData={apiData} setIsFormValid={setIsFormValid}/>
        
        <StaticTestQuestions apiData={apiData} formData={formData} setFormData={setFormData}/>

        <button type='submit'>Submit</button>

        </form>
        
    )
}

export default Form