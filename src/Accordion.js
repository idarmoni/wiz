import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Palette from './Palette';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { addTab, changtabName } from './utils';
import  UploadButton from './uploadFile'


import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import Box from '@mui/material/Box';

// import RichObjectTreeView from './Tree'
import { Gojstree } from './gojstree'

import basicMathTemplates from './basicMathTemplates'
import functionsTemplats from './functionsTemplats'


const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export const SidePannel = function () {



  const [recipesData, setRecipesData] = useState("loading...");
  var recipes = []
  for (var i in recipesData) {
    const index = i
    recipes.push(
      <Button id={recipesData[index].id + '_rcp_button'} key={recipesData[index].id} onClick={() => addTab(recipesData[index].id, recipesData[index].recipeName)}
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
  for (i in matchesFilessData) {
    const index = i
    const matcheFile = matchesFilessData[index]
    matchesFiles.push(
      <Button id={matcheFile.recipeid + '_matche_button'}  onClick={() => AddrecipeMatched(matcheFile)}>
        {matchesFilessData[i].recipeName}
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
  var FBFs = <Gojstree treedata={FBFData}></Gojstree>

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
  var prevfunc=[]
  useEffect(() => {

    // const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
    const fetchData = async () => {
      await axios(
        `http://localhost:3001/pythonFunctions/`,
      ).then(response => {
        if( ! equals(response.data, prevfunc)){
          setPythonFuncs(response.data);
        }
        prevfunc = response.data

      })
        .catch(error => {
          console.error("error fetching data: ", error);
        })
    };
    fetchData();
    const intervalId = setInterval(() => {  //assign interval to a variable to clear it.

  }, 5000)

  return () => clearInterval(intervalId); //This is important
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
          expandIcon={<ExpandMoreIcon />}>
          <Typography>functions</Typography>
        </AccordionSummary>
        <AccordionDetails>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>general</Typography>
            </AccordionSummary>
            <AccordionDetails>

              <Typography>
                <Palette
                  templates={functionsTemplats}
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
              <Palette templates={basicMathTemplates} />
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}>
              <Typography>python</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <UploadButton/>
              <Palette templates={pythonFuncs} />
            </AccordionDetails>
          </Accordion>

        </AccordionDetails>

      </Accordion>


    </div>
  );


  function AddrecipeMatched(matcheFile) {
    // addTab(matcheFile.recipeid,matcheFile.recipeName)

    console.log('matcheFile',matcheFile)
    var matchID = matcheFile.id.split(' ')
    addTab(matcheFile.id,matcheFile.recipeName + " match #" + matchID[1])
  }
}
