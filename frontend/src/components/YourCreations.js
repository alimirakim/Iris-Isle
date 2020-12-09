import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateSelection } from '../actions/selectionActions'
import DeleteForm from './forms/DeleteForm'

export default function YourCreations({
  pid, // Parent-path id
  creationType,
  creations,
  active,
  filterBySelect,
  deleteActionCreator,
  creationForm: CreationForm,
}) {
  const dispatch = useDispatch()
  const selected = useSelector(state => state.selections)
  const [selectedCreations, setSelectedCreations] = useState(creations)

  const handleActive = (selection) => (e) => dispatch(updateSelection(creationType.toLowerCase(), selection))

  useEffect(() => {
    console.log("creations", creations)
    if (filterBySelect) setSelectedCreations(filterBySelect(creations, pid))
    else setSelectedCreations(creations)
  }, [creations, selected])

  let isEmpty = true
  if (Object.keys(selectedCreations).length) isEmpty = false

  return (
    <article>
      <h2>Your {creationType}s</h2>
      <CreationForm id={pid} />
      {isEmpty ? <p>You have no {creationType} yet! Why not start one? :B</p> : ""}
      <dl>
        {Object.values(selectedCreations).map(creation => (
          <div key={creation.id} onClick={handleActive(creation)} className={active.id === creation.id ? "card active" : "card"}>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <DeleteForm creation={creation} creationType={creationType} deleteActionCreator={deleteActionCreator} />
              <CreationForm id={creation.id} edit={creation} />
            </div>
            <dt>{creation.title}</dt>
            <dd>{creation.description}</dd>
          </div>))}
      </dl>
    </article>
  )
}
