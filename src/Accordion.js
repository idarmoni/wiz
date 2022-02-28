import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Palette from './Palette';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { addTab,changRCPName } from './utils';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import Box from '@mui/material/Box';




export const SidePannel = function () {

 
  
  const [data, setData] = useState("loading...");
   var recipes = []
    for (var i in data) {
      const index = i
      recipes.push(
      <Button onClick={()=>addTab(data[index].id,data[index].recipeName)}
      onContextMenu={()=>{
        
          const enteredName = prompt('Please enter new name for the recipe')
          //changRCPName(enteredName,data[index].id)
          addTab(data[index].id,enteredName)
          
      }
      }
      >
        {data[i].recipeName}
        </Button>)
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
      };
      fetchData();
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
        <Box
      sx={{
        display: 'flex',
        '& > *': {
          width:150,
        },
      }}
    >
      <ButtonGroup
      
        orientation="vertical"
        aria-label="vertical outlined button group"
      >
        {recipes}
      </ButtonGroup>
      
      
    </Box>
          
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