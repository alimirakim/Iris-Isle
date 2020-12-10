import React, { useState, useEffect } from "react";
import {useSelector} from 'react-redux'
import { useParams, Link } from "react-router-dom";

function User() {
  const [user, setUser] = useState({});
  const { uid } = useParams();
  const userChronicles = useSelector(state => Object.values(state.chronicles).filter(chronicle => chronicle.user_id === Number(uid)))
  console.log("userchroncs", userChronicles, uid)
  useEffect(() => {
    if (!uid) return
    (async () => {
      const response = await fetch(`/api/users/${uid}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [uid]);

  if (!user) return null;

  return (
    <main>
      <h1>{user.username}'s Profile</h1>
      <dl>
        <dt>User Id</dt>
        <dd>{uid}</dd>
        <dt>Username</dt>
        <dd>{user.username}</dd>
        <dt>Email</dt>
        <dd>{user.email}</dd>
      </dl>
      
      <h2>Published Chronicles</h2>
      <ul>
        {userChronicles.map(chronicle => (
          <li key={chronicle.id}>
            <Link to={`/chronicles/${chronicle.id}`}><dl>
              <dt>Title</dt>
              <dd>{chronicle.title}</dd>
              <dt>Creator</dt>
              <dd><address>{chronicle.creator}</address></dd>
              {/* <dt>Latest Update</dt>
              <dd><datetime>{chronicle.updated_at}</datetime></dd>
              <dt>Tags</dt>
              <dd>{chronicle.tags}</dd>
              <dt>Description</dt> */}
              <dd>{chronicle.description}</dd>
              {/* TODO Notes like how many tales, how many users, wordcount, hearts/stars */}
            </dl>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
export default User;
