import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Palette from './Palette';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { addTab,changtabName } from './utils';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import Box from '@mui/material/Box';

import RichObjectTreeView from './Tree'
import {Gojstree} from './gojstree'




export const SidePannel = function () {

 
  
  const [recipesData, setRecipesData] = useState("loading...");
   var recipes = []
    for (var i in recipesData) {
      const index = i
      recipes.push(
      <Button id={recipesData[index].id+'_button'} onClick={()=>addTab(recipesData[index].id,recipesData[index].recipeName)}
      onContextMenu={()=>changtabName(recipesData[index].id)}
      >
        {recipesData[i].recipeName}
        </Button>)
    }
  
    useEffect(() => {
      const fetchData = async () => {
        await axios(
          `http://localhost:3001/recipes/`,
        ).then(response => {
          setRecipesData(response.data)
        })
          .catch(error => {
            console.error("error fetching data: ", error);
          })
      };
      fetchData();
    }, []);

    
  const [FBFData, setFBFData] = useState("loading...");
  var FBFs = []

  
   for (i in FBFData) {
    // FBFs.push(<RichObjectTreeView dataTree = {FBFData[i]}></RichObjectTreeView>)
    console.log(FBFData[i])
    FBFs.push(<Gojstree treedata = {FBFData[i]}></Gojstree>)
   }
 
   useEffect(() => {
     const fetchData = async () => {
       await axios(
         `http://localhost:3001/fbf/`,
       ).then(response => {
         setFBFData(response.data)
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
        >
          <Typography >
            recipes
            </Typography>
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
      <ButtonGroup id ='recipesButtons'
      
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
        >
          <Typography >
            FBFs
            </Typography>
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
       
        {FBFs}
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
          expandIcon={<ExpandMoreIcon />}>

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
        >
          <Typography>Graphs</Typography>
        </AccordionSummary>
        <AccordionDetails>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>Widgets</Typography>
        </AccordionSummary>
        <AccordionDetails>
        </AccordionDetails>
      </Accordion>

    </div>
  );
}