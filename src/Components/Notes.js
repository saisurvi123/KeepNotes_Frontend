import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import Chip from "@mui/material/Chip";
import { useEffect } from "react";
import notecontext from "../context/notes/notecontext";
import { useContext } from "react";
import BasicModal from "./Basicmodal";


function Notes(props) {
  const notes = props.element;
  const deleteNote=useContext(notecontext).deleteNote;
  const handledelete=(id)=>{
    deleteNote(id);
  }
  // console.log(note.title);
//   useEffect(() => {
//    console.log(props.element);
//   }, [props])
  

  return (
    <>
    
      {notes && notes.map((note) => {
        return (
          <div className="col col-md-3 my-4">
            <div className="card">
              <div className="card-body">
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  // spacing={2}
                >
                  <h5 className="card-title my-2">{note.title}</h5>
                  <BasicModal element={note} />
                  <div className="font-icon-wrapper" onClick={()=>handledelete(note._id)}>
                  {console.log(note._id)}
                  <IconButton aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                  </div>
                </Stack>
                <p className="card-text">{note.description}</p>

                <Chip label={note.tag} />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Notes;
