import React from 'react'
import Avatar from '@mui/material/Avatar';

function About() {
  

  return (
    <div className='container my-5'>
      <div className="row">
        <div className="col col-md-2" style={{padding:"5rem"}}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" 
            sx={{ width: 100, height: 100 }}
          />
        </div>
          <div className="col col-md-10" style={{padding:"5rem"}}>
            <h3 >User Profile </h3>
            <p className="my-3">Name : saikiran</p>
            <p className="my-3">Email : survisaikiran7353@gmail.com</p>
            <input type="file" accept="image/*" multiple = "false"/>            
          </div>
      </div>

    </div>
  )
}

export default About