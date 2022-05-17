import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Palette from './Palette';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { addTab, changtabName } from './utils';


import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import Box from '@mui/material/Box';

// import RichObjectTreeView from './Tree'
import { Gojstree } from './gojstree'

import templates from './basicMathTemplates'
import templates2 from './functionsTemplats'


export const SidePannel = function () {



  const [recipesData, setRecipesData] = useState("loading...");
  var recipes = []
  for (var i in recipesData) {
    const index = i
    recipes.push(
      <Button id={recipesData[index].id + '_button'} onClick={() => addTab(recipesData[index].id, recipesData[index].recipeName)}
        onContextMenu={() => changtabName(recipesData[index].id)}
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


  const [matchesFilessData, setmMtchesFilesData] = useState("loading...");
  var matchesFiles = []
  for (var i in matchesFilessData) {
    const index = i
    const matcheFile = matchesFilessData[index]
    matchesFiles.push(
      <Button id={matcheFile.recipeid + '_button'} onClick={() => AddrecipeMatched(matcheFile)}
        onContextMenu={() => changtabName(matcheFile.recipeid)}
      >
        {matchesFilessData[i].recipeName + " " + matchesFilessData[i].fbfName}
      </Button>)
  }

  useEffect(() => {
    const fetchData = async () => {
      await axios(
        `http://localhost:3001/matchesFiles/`,
      ).then(response => {
        setmMtchesFilesData(response.data)
      })
        .catch(error => {
          console.error("error fetching data: ", error);
        })
    };
    fetchData();
  }, []);

  const [FBFData, setFBFData] = useState([]);
  var FBFs = []


  for (i in FBFData) {
    // FBFs.push(<RichObjectTreeView dataTree = {FBFData[i]}></RichObjectTreeView>)
    // console.log(FBFData[i])
    FBFs.push(<Gojstree treedata={FBFData[i]}></Gojstree>)
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

  
  const [pythonFuncs, setPythonFuncs] = useState([])
    
  useEffect(() => {
    const fetchData = async () => {
      await axios(
        `http://localhost:3001/pythonFunctions/`,
      ).then(response => {
         setPythonFuncs( response.data)
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
                width: 150,
                maxHeight: 300,
                overflow: 'auto'
              },
            }}
          >
            <ButtonGroup id='recipesButtons'
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
            recipesMatched
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              display: 'flex',
              '& > *': {
                width: 150,
                maxHeight: 300,
                overflow: 'auto'
              },
            }}
          >
            <ButtonGroup id='matchesFilesButtons'
              orientation="vertical"
              aria-label="vertical outlined button group"
            >

              {matchesFiles}
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
                width: 150,
                maxHeight: 300,
                overflow: 'auto'
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
              templates={templates2}
               />
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
            templates = {templates}
          />

        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}>

          <Typography>python funcs</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Palette
            templates = {pythonFuncs}

          />
          {/* {typeof pythonFuncs[0]} */}

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


  function AddrecipeMatched(matcheFile) {

    addTab(matcheFile.recipeid + " " + matcheFile.fbfName,
      matcheFile.recipeName + " " + matcheFile.fbfName)
  }
}
