import React, { useState } from 'react'
import StaticSpecificQuestions from '../../StaticSpecificQuestion/StaticSpecificQuestions';
// import { Select, MenuItem } from '@mui/material';

const StaticTechnologyBasedQuestions = ({apiData, formData, setFormData, selectName}) => {

    const [selectedTechnology, setSelectedTechnology] = useState('');


    const [staticTechBaseQuestionData, setStaticTechBaseQuestionData] = useState({});

    function handleSelectedTech(e)
    {
        setSelectedTechnology(e.target.value);

        let baseTechBaseQuestionStructure = {
            
            [e.target.name] : {

                [e.target.value] : {

                    questions:[
                        {
                            question:'',
                            options:[],
                            correctAnswer:''
                        }
                    ],
                }
            }
        }

        setFormData({...formData, dynamicQuestions:{...formData.dynamicQuestions, ...baseTechBaseQuestionStructure}});
        // setStaticTechBaseQuestionData({...staticTechBaseQuestionData, ...baseTechBaseQuestionStructure});

        console.log(staticTechBaseQuestionData)

    }

    function handleAddMoreTechBasedQuestions()
    {
        let questionBase =  {
            question:'',
            options:[],
            correctAnswer:''
        }

        // let copyData = {...formData}
        
        // copyData.dynamicQuestions[selectName][selectedTechnology].questions = [...Object.values(copyData.dynamicQuestions[selectName]), questionBase]

        // console.log(copyData)

        // setFormData({...formData, dynamicQuestions: {...formData.dynamicQuestions,  [selectName] : { [selectedTechnology] : { ...formData.dynamicQuestions[selectName][selectedTechnology], questions: [...formData.dynamicQuestions[selectName][selectedTechnology].questions, questionBase ]}}}})
    
        setFormData({...formData, dynamicQuestions: {...formData.dynamicQuestions, [selectName]: { [selectedTechnology] : { questions:[ ...formData.dynamicQuestions[selectName][selectedTechnology].questions, questionBase ]}}}})


    }


    return (

        <div>

            <select defaultValue={"DEFAULT"} onChange={handleSelectedTech} name={selectName}>
                <option disabled value={"DEFAULT"}>Select Technology</option>
                {
                    Object.keys(apiData).map((technology, index)=>(
                        <option key={index}>{technology}</option>
                    ))
                }
            </select> 

            {
                selectedTechnology && 
                formData.dynamicQuestions[selectName][selectedTechnology].questions.map((element, index)=>(
                    <StaticSpecificQuestions key={index} questionIndex={index} selectName={selectName} formData={formData} setFormData={setFormData} selectedTechnology={selectedTechnology}/>
                ))
            }

            <button type='button' onClick={handleAddMoreTechBasedQuestions}>+ Add More {selectedTechnology} Question</button>

        </div>



    )
}

export default StaticTechnologyBasedQuestions