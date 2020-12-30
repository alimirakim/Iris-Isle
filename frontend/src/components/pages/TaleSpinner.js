import React, { useState, cloneElement, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import TaleDiagram from './TaleDiagram'
import {
  YourChronicles,
  YourTales,
  YourThreads,
  YourChoices
} from '../YourCreations'

// ACTION CREATORS
import { updateSelections, wipeSelections } from '../../store/mainActions/selectionActions'

// read tale thread ids, choice ids, threads, choices
// create nodes and links with thread and choice data
// update xy on mouse-up 
// on +add thread, create new untitled thread, return and dispatch to front, listen for change to threads, then add node to schema
// on -delete thread, feed node id to function, fetch-delete thread, listen for lesser threads, then delete node from schema
// on change of selection, check for selected tale. if tale is different, create and render new schema

export default function TaleSpinner() {
  const dispatch = useDispatch()
  const selected = useSelector(state => state.selections)
  const chronicles = useSelector(state => state.chronicles)


  // Select a user's first chronicle and its tales/content upon initialization
  useEffect(() => {
    dispatch(updateSelections([
      { type: "chronicle", selection: Object.keys(chronicles) ? chronicles[Object.keys(chronicles)[0]] : "" },
    ]))
  }, [])
  // Upon chronicle-selection, clear dependent selections and refresh tales // TODO Plus charas, places, assets, etc.
  useEffect(() => {
    dispatch(wipeSelections(["tale", "thread", "choice", "threads", "choices"]))
  }, [selected.chronicle])

  // Upon tale selection, clear dependent selections and refresh threads
  useEffect(() => {
    dispatch(wipeSelections(["thread", "choice", "threads", "choices"]))
  }, [selected.tale])

  // Upon thread selection, clear dependent selections and refresh choices // TODO Plus effects
  useEffect(() => {
    dispatch(wipeSelections(["choice", "choices"]))
  }, [selected.thread])


  return (
    <main>

      <TaleDiagram />

      <YourChronicles />
      <YourTales />
      <YourThreads />
      <YourChoices />


    </main>
  )
}