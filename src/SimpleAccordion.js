
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
          <IconButton size="large" >
            <AddIcon />
          </IconButton>
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
          <IconButton>
            <img src={plus} width="20" height="20"></img>
          </IconButton>
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
          <Typography>
            TODO
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
          <ButtonGroup variant="outlined">
            <Grid container>
              <Grid item>
                <IconButton onClick={handleClick}>
                  <img id="plusImg" src={plus} width="30" height="30"/>
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton>
                  <img src={minus} width="30" height="30"/>
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton>
                  <img src={division} width="30" height="30"/>
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton>
                  <img src={multiplication} width="30" height="30"/>
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton>
                  <img src={sum} width="30" height="30"/>
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton>
                  <img src={squareroot} width="30" height="30"/>
                </IconButton>
              </Grid>
            </Grid>
          </ButtonGroup>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}