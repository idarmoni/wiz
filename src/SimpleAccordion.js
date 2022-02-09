
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Palette from './Palette';



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
                { "category": "Add"}, { "category": "Substract" },
                { "category": "Mult"}, { "category": "Division"},
                { "category": "Cos"}, { "category": "Sin"},
                { "category": "Tan"}, { "category": "Square"},
                { "category": "Exponent"}, { "category": "Radian2Degree"},
                { "category": "Degree2Radian"}, { "category": "Avarage"},

              ]} />

        </AccordionDetails>
      </Accordion>
    </div>
  );
}