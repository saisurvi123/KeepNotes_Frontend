import { useState } from "react";
import notecontext from "./notecontext";

const host = "https://keepnotes-wfzj.onrender.com";
const Notestate = (props) => {
  const initalstate = [];
  const [state, setstate] = useState(initalstate);
  // const token = localStorage.getItem('token');
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    console.log(json);
    setstate(json);
  };

  const addNote = async (title, description, tag) => {
    const newnote = {
      title: title,
      description: description,
      tag: tag,
    };
    // api call
    const response = await fetch(`${host}/api/notes/createnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
       
      },
      body: JSON.stringify(newnote),
    });
    const json = await response.json();
    console.log(json)
    if(!json.error)setstate(state.concat(json));
  };

  const editNote = async (title, description, tag, id) => {
    // api call maaro
    const newnote = {
        title: title,
        description: description,
        tag: tag,
      };

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
        
      },
      body: JSON.stringify(newnote),
    });
    for (let i = 0; i < state.length; i++) {
      if (state[i]._id === id) {
        console.log(id);
        const newstate = state;
        newstate[i].title = title;
        newstate[i].description = description;
        newstate[i].tag = tag;
        setstate(newstate);
      }
    }
    window.location.reload();

  };
  const deleteNote = async (id) => {
    // api call
    console.log(id);
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
        
      },
    });

    setstate(state.filter((x) => x._id !== id));
  };

  return (
    <notecontext.Provider
      value={{ state, addNote, getNotes, deleteNote, editNote }}
    >
      {props.children}
    </notecontext.Provider>
  );
};
export default Notestate;
