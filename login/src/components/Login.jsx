import React, { useState } from "react";
import {Button, TextField} from "@mui/material";

export const Login = () => {

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <div style={{width: 500}}>
            <h1 style={{textAlign: 'center'}}>Login App</h1>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <TextField label="Email" variant="outlined" style={{ marginBottom: 10}} />
              <TextField label="Password" variant="outlined" type='password' style={{ marginBottom: 10}} />
              <Button  variant="contained">submit</Button>
            </div>
          </div>
        </div>
    );
}
