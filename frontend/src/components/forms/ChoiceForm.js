import React from 'react'
import CreationFormWrapper from './CreationFormWrapper'
import {addChoice, updateChoice} from '../../actions/choiceActions'

export default function ChoiceForm({ id, edit }) {
  const resetUniqueContent = () => console.log("No unique content to reset")
  
  return (<>
      <CreationFormWrapper
        edit={edit}
        path={edit ? `/api/choices/${id}/edit` : `/api/threads/${id}/choices/create` }
        creationType="Choice"
        actionCreator={edit ? updateChoice : addChoice}
        uniqueContent={{}}
        resetUniqueContent={resetUniqueContent}
        uniqueForm={"span"}
      />
  </>)
}