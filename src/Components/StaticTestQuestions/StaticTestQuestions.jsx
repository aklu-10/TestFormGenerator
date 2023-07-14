import StaticTechnologyBasedQuestions from '../StaticTechnologyBasedQuestions/StaticTechnologyBasedQuestions'
import React, { useState } from 'react'

const StaticTestQuestions = ({apiData, formData, setFormData}) => {

    if(!apiData) return <p>loading...</p>;

    const [numOfStaticQuestions, setNumOfStaticQuestions] = useState(0);

    return (
        <div className='formItem'>
                <h2>Static Questions</h2>  

                <div className='formItemInitials'>
                <label>Total number of static question : </label>
                <input type='number' placeholder='Type total number of question' onChange={(e)=>setNumOfStaticQuestions(e.target.value)}/>
                </div>

                {
                    numOfStaticQuestions > 0 &&
                    <StaticTechnologyBasedQuestions apiData={apiData} formData={formData} setFormData={setFormData} selectName={'select0'}/>
                }
                {
                    numOfStaticQuestions > 1 && 
                    <button type='button'>+ Add More Tech Based Question</button>
                }
                
            </div>
    )
}

export default StaticTestQuestions