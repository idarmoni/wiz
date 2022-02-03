
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import plus from './img/plusIcon.png'
import minus from './img/minusIcon.png'
import division from './img/divisionIcon.png'
import multiplication from './img/multiplicationIcon.png'
import sum from './img/sumIcon.png'
import squareroot from './img/squarerootIcon.png'
import Palette from './Palette';


function handleClick() {
  //לבצע אירוע כאשר לוחצים על הכפתור

}

export const SimpleAccordion = function () {
  return (
    <div>
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
                { "category": "2inputfunc" }, { "category": "Filter" },
                { "category": "Group" }, { "category": "Sort" },
                { "category": "Export" }
              ]} />
          </Typography>
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
                { "category": "2inputfunc", "name": "plus" },
                { "category": "2inputfunc", "name": "minus" },
                { "category": "2inputfunc", "name": "multiply" },
                { "category": "2inputfunc", "name": "divide" },
              ]} />

        </AccordionDetails>
      </Accordion>
    </div>
  );
}