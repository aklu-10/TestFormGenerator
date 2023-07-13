import PredefinedTestQuestions from '../PredefinedTestQuestion/PredefinedTestQuestions';
import React, {useState, useEffect} from 'react'
import axios from 'axios';

const Form = () => {

    const [apiData, setApiData] = useState(null);

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
            react:{
                total:0,
                questions:[],
            }
        }
    });

    function handleFormSubmission(e)
    {
        e.preventDefault();
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
                
        <PredefinedTestQuestions formData={formData} setFormData={setFormData} apiData={apiData}/>
        
        <div className='formItem'>
            <h2>Static Questions</h2>  

            <div className='formItemInitials'>
            <label>Total number of static question : </label>
            <input type='number' placeholder='Type total number of question'/>
            </div>

            <button type='button'>+ Add Question</button>
        </div>

        <button type='submit'>Submit</button>

        </form>
        
    )
}

export default Form