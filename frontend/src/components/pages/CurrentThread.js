import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useLocation, Link } from 'react-router-dom'
import parse from 'html-react-parser'

import Header from '../Header'

export default function CurrentThread({auth, setAuth}) {
  const { cid, tid } = useParams()
  const { state: { thid } } = useLocation()
  const tale = useSelector(state => state.tales[tid])
  const { effects, threads, thread, choices, initCurrentChoices } = useSelector(state => ({
    effects: state.effects,
    threads: state.threads,
    choices: state.choices,
    thread: state.threads[thid],
    initCurrentChoices: Object.values(state.choices).filter(choice => choice.prev_thread_id === thid),
  }))
  const [history, setHistory] = useState([])
  const [currentThread, setCurrentThread] = useState(thread)
  const [currentChoices, setCurrentChoices] = useState(initCurrentChoices)

  const handleChoice = (chid) => (e) => {
    const updatedHistory = [...history]
    updatedHistory.push(currentThread.id)
    setHistory(updatedHistory)
    console.log("history", history)
    setCurrentThread(threads[chid])
    setCurrentChoices(Object.values(choices).filter(choice => choice.prev_thread_id == threads[chid].id))
  }

  const handleGoBack = (e) => {
    console.log("history", history)
    const prevThread = threads[history[history.length - 1]]
    setHistory(history.slice(0, history.length - 1))
    setCurrentThread(threads[prevThread.id])
    setCurrentChoices(Object.values(choices).filter(choice => choice.prev_thread_id == prevThread.id))
  }

  const checkLocks = (e) => {
    return true
    // TODO Check for locks. On each lock, check requirements, then eventually return final yes/no
  }

  return (<>
        <Header
          auth={auth} setAuth={setAuth}
          imageUrl={currentThread.image}
          title={tale.title}
          subtitle={currentThread.title}
        />
    
    <main>
    <section>
    <div style={{ margin: "1rem" }}><Link to={`/chronicles/${cid}/tales/${tid}`}><i className="fas fa-arrow-left" ></i> Go Back</Link></div>

    <h1 style={{ margin: "0 4rem" }}>{tale.title}</h1>
    <section className="chron-head">
      <h2>{currentThread.title}</h2>
      <p>{parse(currentThread.description)}</p>
    </section>

    <hr />
    <h3>Effects</h3>
    <i>N/A</i>
    <ul>
      {thread.asset_effects.map(i => <li key={i}>Effect: {effects[i].title}</li>)}
    </ul>
    <hr />


    <h3>Make Your Choice...</h3>
    <ul>
    {/* TODO Check if 'is_returnable' before allowing Go Back option */}
      {thread.is_returnable && history.length
        ? <li className="card" >
        <button onClick={handleGoBack} className="yrc-con lo-center-y">
        <span><i className="fas fa-arrow-left" ></i> Go Back</span>
        </button>
        </li>
        : <li className="card"><Link to={`/chronicles/${cid}/tales/${tid}`}   className="yrc-con lo-center-y"><span><i className="fas fa-arrow-left" ></i> Go Back</span></Link></li>
      }
      {currentChoices.filter(choice => checkLocks(choice)).map(choice => (
        

        <li key={choice.id} className="card" onClick={handleChoice(choice.next_thread_id)}>
        <div style={{ backgroundColor: choice.color }} className="card-pic">
                  <i className={`fas fa-${choice.icon} lo-center-y`}></i>
                </div>
                <div className="yrc-con lo-center-y">
        {choice.title}
        </div>
        </li>
      ))}
    </ul>
  </section>
  </main>
  </>)
}