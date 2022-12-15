import React, { useState } from "react";
import {Button, TextField} from "@mui/material";
import {BarChart} from './BartChart'

export const Dashboard = () => {

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <div style={{}}>
            <h1 style={{textAlign: 'center'}}>Dashboard App</h1>
            <BarChart />
          </div>
        </div>
    );
}
