import React, { useState } from 'react'

const StaticSpecificQuestions = ({questionIndex, selectName, formData, setFormData, selectedTechnology}) => {


    const [questionOptions, setQuestionOptions] = useState({option1:''});

    const [correctAnswer, setCorrectAnswer] = useState('');


    function handleAddMoreOptions()
    {
        // let optionsArrLen = Object.keys(questionOptions).length;
        // let prevOptionsLen = Object.keys(questionOptions)[optionsArrLen-1].length;
        // let prevOptionsLastChar =  Object.keys(questionOptions)[optionsArrLen-1][prevOptionsLen-1]

        // let optionsArr = Object.keys(questionOptions);
        // let optionsArrLen = Object.keys(questionOptions).length;
        // let lastOption = Object.keys(questionOptions)[optionsArrLen-1];
        // let lastOptionLen = Object.keys(questionOptions)[optionsArrLen-1].length;
        // console.log(lastOptionLen)
        // let lastChar = lastOption[lastOptionLen]  

        // console.log(lastOption)

        let lastOption = Object.keys(questionOptions).slice(-1);
        let lastOptionLen = lastOption[0].length;
        let lastChar = Number(lastOption[0][lastOptionLen-1]);

        let optionsBase = {
            ["option"+(lastChar+1)]:''
        }

        setQuestionOptions({...questionOptions, ...optionsBase});

        // console.log(questionOptions)
    }

    function handleFieldChange(e)
    {
        // console.log(questionIndex, selectName, e.target.value)

        // console.log(formData)

        // let copyData = formData.dynamicQuestions[selectName][selectedTechnology].questions;


        // console.log(copyData)

        // setFormData({...formData, dynamicQuestions : { ...formData.dynamicQuestions, [selectName] : { ...formData.dynamicQuestions[selectName], [selectedTechnology] : { questions:  } }}})

        
    }

    return (
        
        <div>

            <div>
                <p>Question</p>
                <input type='text' placeholder='Type question here' name='question' onChange={handleFieldChange}/>
            </div>

            <div>

                {
                    Object.keys(questionOptions).map((element, index)=>(
                        
                        <div key={index}>
                            <label>{String.fromCharCode(65+index)}. </label>
                            <input type='options' placeholder='Type options here' name={element} onChange={(e)=>setQuestionOptions({...questionOptions, [e.target.name]: e.target.value})}/>
                        </div>
                    ))
                }

            </div>
            {
                Object.keys(questionOptions).length < 4 &&
                <button type='button' onClick={handleAddMoreOptions}>+ Add Options</button>
            }

            <div>
                <p>Correct Answer : </p>
                <div>

                    {
                        Object.keys(questionOptions).map((element, index)=>(

                            <div key={index} style={{display:'flex', alignItems:'center',}}>
                                <input type='radio' name={'correctAnswer1'} value={questionOptions[element]} onChange={(e)=>setCorrectAnswer(e.target.value)}/>
                                <label>{String.fromCharCode(65+index)}</label>
                            </div>

                        ))
                    }

                </div>
            </div>

        </div>

    )
}

export default StaticSpecificQuestions