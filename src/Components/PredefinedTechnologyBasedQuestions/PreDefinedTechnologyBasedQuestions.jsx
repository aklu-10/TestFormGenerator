import React, { useState, useRef } from 'react'

// baseDataStructure - react : { total:0, questions:[] }

const PreDefinedTechnologyBasedQuestions = ({technologies, formData, setFormData, fieldName, numofPredefinedQuestions, setHideAddTechnologyBtn, counterToCheckIsGreaterThanProvidedNumOfQuestions, setIsFormValid}) => {

    if(!technologies) return;
    
    const [showGreaterThan, setShowGreaterThan] = useState(false);

    const [disableFields, setDisabledFields] = useState({mcq:false, programming: false, descriptive: false})

    // const [preTechnologyTestData, setPreTechnologyTestData] = useState({});

    // const counterToCheckIsGreaterThanProvidedNumOfQuestions = useRef({mcq:0, programming:0, descriptive:0});
    
    const [selectedTech, setSelectedTech] = useState('');

    // function sumAllQuestionVariationCounts()
    // {
    //     return Object.values(counterToCheckIsGreaterThanProvidedNumOfQuestions.current).reduce( (acc, item) => acc + item )
    // }

    function sumAllQuestionVariances(obj)
    {
        // console.log("val - ", val)

        // if(val && counterToCheckIsGreaterThanProvidedNumOfQuestions.current>0)
        // {
            // counterToCheckIsGreaterThanProvidedNumOfQuestions.current-=val;
            // return;
        // }

        // console.log(val)

        // console.log(obj)
        // console.log(obj);

        let allSelectedQuesVarianceObj = Object.keys(obj.predefinedQuestions).filter(keyName => keyName.includes("select")).map(item=>obj.predefinedQuestions[item])

        let sum = allSelectedQuesVarianceObj.map(selectedTech=>{
            
            return Object.values(Object.entries(selectedTech)[0][1]).reduce((acc, item) => Number(acc)+Number(item))
            // Object.values(selectedTech)[0].reduce((acc, item) => acc+item)
        })


        counterToCheckIsGreaterThanProvidedNumOfQuestions.current = sum.reduce((acc, item)=>acc+item)

    }

    function handleSelectChange(e)
    {
        let value = e.target.value;

        let base = 
        {
            mcq:0,
            programming:0,
            descriptive:0,
        }
    
        // let baseStructure = { [value]: base}

        setSelectedTech(value);
        setFormData({...formData, predefinedQuestions: { ...formData.predefinedQuestions, [fieldName] : { [value]: base }}});
    }

    function handleQuestionVariation(e)
    {
        // setPreTechnologyTestData({...preTechnologyTestData, [e.target.id]:{...preTechnologyTestData[e.target.id], [e.target.name]: e.target.value}});
        // console.log(e.target.id);
    
        // counterToCheckIsGreaterThanProvidedNumOfQuestions.current = {...counterToCheckIsGreaterThanProvidedNumOfQuestions.current, [e.target.name] : Number(e.target.value)}

        let updatedFormData = {...formData, predefinedQuestions: {...formData.predefinedQuestions, [fieldName] : {...formData.predefinedQuestions[fieldName], [selectedTech] : { ...formData.predefinedQuestions[fieldName][selectedTech], [e.target.name] : e.target.value }}}};
        // setFormData({...formData, predefinedQuestions: { ...formData.predefinedQuestions, [fieldName] : { ...formData.predefinedQuestions[fieldName], [selectedTech] : {...formData.preTechnologyTestData[fieldName][selectedTech], [e.target.name] : e.target.value }}}})

        
        // if(counterToCheckIsGreaterThanProvidedNumOfQuestions.current <= numofPredefinedQuestions)
        setFormData(updatedFormData)

        sumAllQuestionVariances(updatedFormData)

        if(counterToCheckIsGreaterThanProvidedNumOfQuestions.current < numofPredefinedQuestions)
            setIsFormValid(false);
        else
            setIsFormValid(true);

        if(counterToCheckIsGreaterThanProvidedNumOfQuestions.current >= numofPredefinedQuestions)
        {
            Object.keys(disableFields).filter(fields=>fields!=e.target.name).map(element=>(
                disableFields[element] = true
            ))
        }
        else
        {
            Object.keys(disableFields).filter(fields=>fields!=e.target.name).map(element=>(
                disableFields[element] = false
            ))
        }
    


        // if( sumAllQuestionVariationCounts() <= numofPredefinedQuestions )
        // {
        //     setShowGreaterThan(false);
        //     setHideAddTechnologyBtn(false);
        // }
        // else
        // {
        //     setShowGreaterThan(true);
        //     setHideAddTechnologyBtn(true);
        // }

        // if( sumAllQuestionVariationCounts() === numofPredefinedQuestions)
        // {
        //     setHideAddTechnologyBtn(true);
        // }


        // console.log(Object.values(counterToCheckIsGreaterThanProvidedNumOfQuestions.current).reduce( (acc, item) => acc + item ))

        // if(e.target.value!=0)
        //     checkGreaterThanProvQues.current += Number(e.target.value);

        // checkGreaterThanProvQues.current += Number(e.target.value);

        // console.log(counterToCheckIsGreaterThanProvidedNumOfQuestions)
        // counterToCheckIsGreaterThanProvidedNumOfQuestions.current += Number(e.target.value);        

        // console.log(counterToCheckIsGreaterThanProvidedNumOfQuestions.current)

        // console.log(sumAllQuestionVariationCounts(), numofPredefinedQuestions)

    }

    return (
        
        <>
            {/* {
                sumAllQuestionVariationCounts() === numofPredefinedQuestions ? 
                <span style={{color:'green'}}>Your number of questions are equivalent to provided questions</span> : null
            }

            {
                showGreaterThan ? 
                <span style={{color:'red'}}>Your number of questions are greater than to provided questions</span> : null
            } */}


            <div className='formItemFields'>
                <select name={fieldName} onChange={handleSelectChange} defaultValue={"DEFAULT"} >
                <option disabled value={"DEFAULT"}>Select technology </option>
                {
                    technologies.map((keyName, index)=>(
                        <option key={index} value={keyName}>{keyName}</option>
                    ))
                }
                </select>
                
                {
                selectedTech.length!=0 &&
                    <>
                        <div>
                            <label>MCQ</label>
                            <input type='number' id={selectedTech} name='mcq' placeholder='Number of Mcq based' onChange={handleQuestionVariation} disabled={disableFields.mcq}/>
                        </div>

                        <div>
                            <label>Programming</label>
                            <input type='number' id={selectedTech} name='programming' placeholder='Number of programming based' onChange={handleQuestionVariation} disabled={disableFields.programming}/>
                        </div>

                        <div>
                            <label>Descriptive</label>
                            <input type='number' id={selectedTech} name='descriptive' placeholder='Number of descriptive based' onChange={handleQuestionVariation} disabled={disableFields.descriptive}/>
                        </div>  
                    </>
                }

            </div>
            
        </>
    )
}

export default PreDefinedTechnologyBasedQuestions