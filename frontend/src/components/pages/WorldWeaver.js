import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

// YOUR COMPONENTS
import YourCreations from '../YourCreations'

// FORM COMPONENTS
import ChronicleForm from '../forms/ChronicleForm'
import CharacterForm from '../forms/CharacterForm'
import PlaceForm from '../forms/PlaceForm'
import AssetForm from '../forms/AssetForm'
import StatusForm from '../forms/StatusForm'
import MeterForm from '../forms/MeterForm'

// ACTION CREATORS
import { deleteChronicle } from '../../store/mainActions/chronicleActions'
import { deleteCharacter } from '../../store/mainActions/characterActions'
import { deletePlace } from '../../store/mainActions/placeActions'
import { deleteAsset } from '../../store/mainActions/assetActions'
import { deleteStatus } from '../../store/mainActions/statusActions'
import { deleteMeter } from '../../store/mainActions/meterActions'


export default function WorldWeaver({ auth, setAuth }) {

  const dispatch = useDispatch()
  // TODO QUESTION Ask, is this less efficient than selecting each individually??
  const user = useSelector(state => state.user)
  const chronicles = useSelector(state => state.chronicles)
  const selected = useSelector(state => state.selections)
  const characters = useSelector(state => state.characters)
  const assets = useSelector(state => state.assets)
  const places = useSelector(state => state.places)
  const statuses = useSelector(state => state.statuses)
  const meters = useSelector(state => state.meters)

  if (!user) return null

  return (
    <main>
      {/* <p>Welcome, {user.username}...</p> */}

      <div className="lo-wow" style={{ margin: "2rem 0", padding: "0.5rem", textAlign: "center", backgroundColor: "rgba(70,40,60,0.2)", borderRadius: "1rem 0", transform: "skew(-10deg)" }}>
        <Link to={`/talespinner`}>Go to TaleSpinner</Link>
      </div>

      <YourCreations
        creationType="chronicle"
        creations={chronicles}
        creations={Object.values(chronicles).filter(c => user.chronicle_ids.includes(c.id))}
        creationForm={ChronicleForm}
        deleteActionCreator={deleteChronicle}
      />

      <YourCreations
        creationType="character"
        creations={Object.values(characters).filter(char => user.character_ids.includes(char.id))}
        deleteActionCreator={deleteCharacter}
        creationForm={CharacterForm}
      />

      {/* places */}
      <YourCreations
        creationType="place"
        creations={Object.values(places).filter(p => user.place_ids.includes(p.id))}
        deleteActionCreator={deletePlace}
        creationForm={PlaceForm}
      />

      {/* assets */}
      <YourCreations
        creationType="asset"
        creations={Object.values(assets).filter(a => user.asset_ids.includes(a.id))}
        deleteActionCreator={deleteAsset}
        creationForm={AssetForm}
      />

      {/* statuses */}
      <YourCreations
        creationType="status"
        creations={Object.values(statuses).filter(cond => user.status_ids.includes(cond.id))}
        deleteActionCreator={deleteStatus}
        creationForm={StatusForm}
      />


      <YourCreations
        creationType="meter"
        creations={Object.values(meters).filter(m => user.meter_ids.includes(m.id))}
        deleteActionCreator={deleteMeter}
        creationForm={MeterForm}
      />


    </main>
  )
}
