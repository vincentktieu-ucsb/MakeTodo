import React, { useState } from 'react';
import Layout from '../components/Layout';
import getBackgrounds from '../utils/get.backgrounds';
import authenticate from '../utils/authenticate';
import Form from 'react-bootstrap/Form';
import Container from '@material-ui/core/Container';
import Image from 'react-bootstrap/Image';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Fab from '@material-ui/core/Fab';
import 'date-fns';
import { useSnackbar } from 'notistack';
import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import axios from 'axios';

export default function Create() {
  let user = authenticate();
  const { enqueueSnackbar } = useSnackbar();
  const backgrounds = getBackgrounds();
  const [todoName, setTodoName] = useState();
  const [dueDate, setDueDate] = useState(new Date());
  const [description, setDesciption] = useState("");
  const [imageURL, setImageURL] = useState(backgrounds[0]);

  function getBackground() {
    let result = []
    for (let i=0; i < backgrounds.length; i++) {
      result.push(<FormControlLabel value={backgrounds[i]} control={<Radio />} label={<Image style={{width: "100%"}} src={backgrounds[i]} rounded></Image>} />)
    }
    return result
  }

  function createTodo(e) {
    e.preventDefault();
    e.stopPropagation();
    enqueueSnackbar("Todo Created", {variant: "success"})
    
    let data = {
      todoName: todoName,
      dueDate: dueDate,
      description: description,
      imageUrl: imageURL
    }
        
    setTodoName("");
    setDueDate(new Date());
    setDesciption("");
    setImageURL(backgrounds[0]);

    axios.post("/api/user/" + user.id + "/todo/create", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <Layout user={user}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={10} sm={9}>
            <h2>
              <Fab className="mb-1 mr-2" color="primary" href="/profile" size="small">
                <ArrowBackIcon className="white-text" />
              </Fab>
              Create
            </h2>
            <Card
              className="p-2 mb-2"
              variant="outlined"
            >
              <Form onSubmit={createTodo}>
                <Grid container spacing={1} direction="column">
                  <Grid container item spacing={1}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        required
                        size="small"
                        fullWidth
                        label="Event Name" 
                        variant="outlined"
                        value={todoName}
                        onChange={(e) => setTodoName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                          required
                          inputVariant="outlined"
                          size="small"
                          label="Due Date"
                          value={dueDate}
                          onChange={setDueDate}
                          fullWidth
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <TimePicker
                          required
                          inputVariant="outlined"
                          size="small"
                          label="Due Time"
                          value={dueDate}
                          onChange={setDueDate}
                          fullWidth
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                  </Grid>
                  <Grid container item>
                    <TextField
                      fullWidth
                      label="Event Desciption" 
                      variant="outlined"
                      multiline
                      rows={4}
                      rowsMax={10}
                      value={description}
                      inputProps={{ maxLength: 1000 }}
                      onChange={(e) => setDesciption(e.target.value)}
                    />
                  </Grid>
                  <Grid container item>
                    <Image style={{width: "100%"}} src={imageURL} rounded></Image>
                  </Grid>
                  <Grid container item>
                    <Button type="submit" className="mb-2" variant="contained" color="primary" fullWidth>Submit</Button>
                  </Grid>
                </Grid>
              </Form>
            </Card>
          </Grid>
          <Grid item xs={10} sm={3}>
            <h2>Backgrounds
          </h2>
            <Card
              className="mb-2 p-2"
              variant="outlined"
              style={{
                overflowY: "auto",
                maxHeight: "600px",
                height: "600px",
              }}
            >
              <RadioGroup required value={imageURL} onChange={(e) => setImageURL(e.target.value)}>
                {getBackground()}
              </RadioGroup>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}