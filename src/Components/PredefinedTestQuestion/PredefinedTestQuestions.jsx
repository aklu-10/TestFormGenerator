import React, { useState, useRef } from 'react'
import PreDefinedTechnologyBasedQuestions from '../PredefinedTechnologyBasedQuestions/PreDefinedTechnologyBasedQuestions';

const PredefinedTestQuestions = ({formData, setFormData, apiData, setIsFormValid}) => {

    if(!apiData) return; 

    const technologies = useRef(Object.keys(apiData));
    const [numOfTechBasedQuestion, setNumOfTechBasedQuestion] = useState([[...technologies.current]]);
    const [numofPredefinedQuestions, setNumofPredefinedQuestions] = useState(0);
    // const [hideAddTechnologyBtn, setHideAddTechnologyBtn] = useState(false)
    const counterToCheckIsGreaterThanProvidedNumOfQuestions = useRef(0);

    

    // console.log(counterToCheckIsGreaterThanProvidedNumOfQuestions.current, numofPredefinedQuestions)

    function handleMoreTechQuestion()
    {
        setNumOfTechBasedQuestion([...numOfTechBasedQuestion, 0]);
        let prev = Object.keys(formData.predefinedQuestions)
                    .filter(keyName=>keyName.includes("select"))
                    .map(element=>Object.keys(formData.predefinedQuestions[element])[0]);
        technologies.current = technologies.current.filter(tech=>!prev.includes(tech))
        setNumOfTechBasedQuestion([...numOfTechBasedQuestion, technologies.current]);
    }

    return (

    <div className='formItem'>

        <h2>Predefined Questions</h2>  

        <div className='formItemInitials'>
        <label>Total number of predefined question : </label>
        <input type='number' placeholder='Type total number of question' onChange={(e)=>setNumofPredefinedQuestions(Number(e.target.value))}/>
        </div>
        
        {/* {
            counterToCheckIsGreaterThanProvidedNumOfQuestions.current > numofPredefinedQuestions &&
            <span style={{color: 'red'}}>Your number of questions are greater than provided questions</span>
        } */}

        {
            counterToCheckIsGreaterThanProvidedNumOfQuestions.current!=0 && counterToCheckIsGreaterThanProvidedNumOfQuestions.current === numofPredefinedQuestions ?
            <span style={{color:'green'}}>Your number of questions are equivalent to provided questions</span> : counterToCheckIsGreaterThanProvidedNumOfQuestions.current > numofPredefinedQuestions ?
            <span style={{color:'red'}}>Your number of questions are greater than provided questions</span> : null 
            
                
        }

        {
            numofPredefinedQuestions > 0 &&

            numOfTechBasedQuestion.map((techs, index)=>(
                
                <PreDefinedTechnologyBasedQuestions key={index} fieldName={"select"+index} technologies={techs} formData={formData} setFormData={setFormData} numofPredefinedQuestions={numofPredefinedQuestions} counterToCheckIsGreaterThanProvidedNumOfQuestions={counterToCheckIsGreaterThanProvidedNumOfQuestions} setIsFormValid={setIsFormValid}/>
            ))
        }

        
        {
            numofPredefinedQuestions > 1 && counterToCheckIsGreaterThanProvidedNumOfQuestions.current < numofPredefinedQuestions &&

            Object.keys(apiData).length!=0 &&
            <button type='button' onClick={handleMoreTechQuestion}>+ Add more technology question</button>
        }

    </div>
        
    )
}

export default PredefinedTestQuestions