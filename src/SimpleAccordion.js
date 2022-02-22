
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Palette from './Palette';
import axios from 'axios';
import React, { useState, useEffect } from 'react';



export const SimpleAccordion = function () {
  
  const [data, setData] = useState("loading...");
  const [loading, setLoading] = useState(true);
   var recipes = []
    // console.log(data)
    // console.log(loading)
    for (var i in data) {

      // console.log(data[i])
      // console.log(i)
      recipes.push(<button onClick={()=>alert('open '+ data[i].recipeName)}>{data[i].recipeName}</button>)

    }
  
    useEffect(() => {
      const fetchData = async () => {
        await axios(
          `http://localhost:3001/files/`,
        ).then(response => {
          setData(response.data)
        })
          .catch(error => {
            console.error("error fetching data: ", error);
          })
          .finally(() => {
            setLoading(false)
          })
      };
  
      fetchData();
      // alert(data)
    }, []);

  return (
    <div>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>recipes</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {recipes}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>functions</Typography>
        </AccordionSummary>
        <AccordionDetails>

          <Typography>
            <Palette
              nodeArray={[
                { "category": "Input" }, { "category": "Table" },
                { "category": "Join" }, { "category": "Project" },
                { "category": "Filter" }, { "category": "Group" },
                { "category": "Sort" }, { "category": "Output" }
              ]} />
          </Typography>
        </AccordionDetails>
      </Accordion>


      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header">

          <Typography>Basic Math</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Palette
            nodeArray={[
              { "category": "Add" }, { "category": "Substract" },
              { "category": "Mult" }, { "category": "Division" },
              { "category": "Cos" }, { "category": "Sin" },
              { "category": "Tan" }, { "category": "Square" },
              { "category": "Exponent" }, { "category": "Radian2Degree" },
              { "category": "Degree2Radian" }, { "category": "Avarage" },

            ]} />

        </AccordionDetails>
      </Accordion>


      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Graphs</Typography>
        </AccordionSummary>
        <AccordionDetails>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Widgets</Typography>
        </AccordionSummary>
        <AccordionDetails>
        </AccordionDetails>
      </Accordion>

    </div>
  );
}