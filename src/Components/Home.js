import React, { useState } from "react";
import Notes from "./Notes";
import { useContext } from "react";
import notecontext from "../context/notes/notecontext";
import { useRef } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate=useNavigate();
  const getNotes=useContext(notecontext).getNotes;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate('/login');
    }
  }, [])
  const addNote=useContext(notecontext).addNote;
  const notes = useContext(notecontext).state;
  const [newnote, setnewnote] = useState({title:"",description:"",tag:""});
  
  const onChange=(e)=>{
    setnewnote({...newnote,[e.target.name]:e.target.value});
  }
  const handleclick = (event) => {
      event.preventDefault();
    addNote(newnote.title,newnote.description,newnote.tag);
    setnewnote({title:"",description:"",tag:""});
  };

  return (
    <div className="container my-5 ">
      <h3>Add note</h3>
      <form>
        <div className="form-group my-3">
          {/* <label for="exampleInputEmail1">Title</label> */}
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            placeholder="Enter the title"
            onChange={onChange}
            value={newnote.title}
            
          />
        </div>
        <div className="form-group my-3">
          {/* <label for="exampleInputPassword1">Description</label> */}
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            placeholder="Describe the note"
            onChange={onChange}
            value={newnote.description}

           
          />
        </div>
        <div className="form-group my-3">
          {/* <label for="exampleInputPassword1">Description</label> */}
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            placeholder="Tag the note"
            onChange={onChange}
            value={newnote.tag}
          />
        </div>

        <button disabled={!(newnote.title.length>5 && newnote.description.length>5)}  className="btn btn-primary my-3" onClick={handleclick}>
          Add
        </button>
      </form>
      <h3 className="my-3">Your notes</h3>
      <div className="mynotes row">
        {/* {notes.map((note) => {
            console.log(note);
          return <Notes element={note} />;
        })} */}
        <Notes element={notes}  />
      </div>
    </div>
  );
}

export default Home;
