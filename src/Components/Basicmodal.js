import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useContext } from "react";
import notecontext from "../context/notes/notecontext";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [upnote, setupnote] = useState(props.element);
  const editNote=useContext(notecontext).editNote;
 

  const onChange=(e)=>{
    setupnote({...upnote,[e.target.name]:e.target.value});
  }

  const handleclick=(event)=>{
    event.preventDefault();
    console.log("hello motto");
    editNote(upnote.title,upnote.description,upnote.tag,upnote._id);
    handleClose();
  }

  return (
    <div>
      <div className="font-icon-wrapper" onClick={handleOpen}>
        <IconButton aria-label="delete">
          <EditIcon />
        </IconButton>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <form>
        <h3>Edit the note</h3>
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
            value={upnote.title}
            
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
            value={upnote.description}

           
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
            value={upnote.tag}

            
          />
        </div>

        <button   className="btn btn-primary my-3" onClick={handleclick}>
          Submit
        </button>
      </form>
        </Box>
      </Modal>
    </div>
  );
}
