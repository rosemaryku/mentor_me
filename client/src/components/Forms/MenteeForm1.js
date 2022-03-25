import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Link,
  styled,
  Grid,
  Paper,
  Rating,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import NavBar from "../NavBar";
import axios from "axios";
import DropDownMentors from "./DropDownMentors";
import DropDownDuration from "./DropDownDuration";

function MenteeForm() {
  let { id, mentor_id } = useParams();
  let navigate = useNavigate();

  // const [state, setState] = useState({
  //   sessions: {},
  //   description: "",
  //   rating: "",
  // });

  // useEffect(() => {
  //   axios
  //     //axios url path still hardcoded
  //     .get(`http://localhost:8080/users/${id}/mentors/${mentor_id}`)
  //     .then((response) => {
  //       console.log("data!");
  //       //Need first row of data only
  //       setState({ sessions: response.data[0] });
  //       console.log(response.data);
  //     })
  //     .catch((err) => {
  //       console.log("error!");
  //       console.log(err);
  //     });
  // }, []);

  const [mentee, setMentee] = useState("");
  const [mentor, setMentor] = useState("");
  const [userData, setUserData] = useState(id);
  const [allMentors, setAllMentors] = useState([]);
  const [state, setState] = useState({
    // mentor_id: "",
    // mentee_id: "",
    date: new Date(),
    mentor_confirmed: false,
    duration: 0,
  });

  useEffect(() => {
    axios.get(`http://localhost:8080/users/${id}`).then((response) => {
      console.log("data!", response.data);

      if (response.data[0].mentor) {
        setMentor(response.data[0].id);
      } else {
        setMentee(response.data[0].id);
      }
    });
    axios
      .get(`http://localhost:8080/mentors`)
      .then((response) => {
        console.log("second get!", response.data);

        setAllMentors(response.data);
      })
      // axios
      //   .get(`http://localhost:8080/users/${id}/sessions/`)
      //   .then((response) => {
      //     console.log("data!");
      //     setMentee(response.data);
      //     console.log(response.data);
      //   });
      // axios
      //   .get(`http://localhost:8080/users/${id}/mentors/sessions/`)
      //   .then((response) => {
      //     console.log("data!");
      //     setMentor(response.data);
      //     console.log(response.data);
      //   })
      .catch((err) => {
        console.log("error!");
        console.log(err);
      });
  }, []);

  console.log("mentor", mentor);
  console.log("mentee", mentee, "asdasd");
  console.log("allMentors!", allMentors);

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "10em",
    maxHeight: "10em",
  });

  const dateFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();

    if (mentee) {
      axios
        //add conditional post req depending on if id is mentor or mentee

        .post(`http://localhost:8080/users/${id}/sessions/new`, {})
        .then(function (response) {
          console.log(response);
          navigate(`/users/${id}/sessions`);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios
        //add conditional post req depending on if id is mentor or mentee

        .post(`http://localhost:8080/users/${id}/sessions/new`, {
          //pending boolean true
          //fix wording later for boolean value
        })
        .then(function (response) {
          console.log(response);
          navigate(`/users/${id}/sessions`);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <NavBar />
      {mentee && (
        <>
          <h1>mentee not mentor</h1>
          <form className="form-control" onSubmit={onSubmitForm}>
            {/* <label for="message">Please tell us about your experience:</label> */}
            <TextField
              // size="medium"
              multiline
              label="Proposal"
              // style={{ width: "100%" }}
              style={{ width: "100%" }}
              // variant="outlined"
              id="outlined-multiline-static"
              rows={1}
              name="description"
              type="text"
              className="form-control"
              required
              // placeholder="Please write a brief description of how your message went with your mentor"
              // value={state.description}
              // onInput={(event) =>
              //   setState({ ...state, description: event.target.value })
              // }
            />

            {/* mentor_id: "",
    mentee_id: "",
    date: new Date(),
    mentor_confirmed: false,
    duration: 0, */}
            <DropDownMentors allMentors={allMentors} />
            <DropDownDuration />
            {/* <TextField
              // size="medium"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              label="Duration"
              // style={{ width: "100%" }}
              style={{ width: "100%" }}
              // variant="outlined"
              id="outlined-multiline-static"
              name="duration"
              type="text"
              className="form-control"
              required
              // placeholder="Please write a brief description of how your message went with your mentor"
              value={state.duration}
              onInput={(event) =>
                setState({ ...state, duration: event.target.value })
              }
            /> */}
          </form>
        </>
      )}
      {mentor && (
        <>
          <h1>mentor not mentee</h1>
          <form className="form-control" onSubmit={onSubmitForm}>
            {/* <label for="message">Please tell us about your experience:</label> */}
            <TextField
              // size="medium"
              multiline
              label="Proposal"
              // style={{ width: "100%" }}
              style={{ width: "100%" }}
              // variant="outlined"
              id="outlined-multiline-static"
              rows={4}
              name="description"
              type="text"
              className="form-control"
              required
              // placeholder="Please write a brief description of how your message went with your mentor"
              // value={state.description}
              // onInput={(event) =>
              //   setState({ ...state, description: event.target.value })
              // }
            />
          </form>
        </>
      )}
    </div>
  );
}

export default MenteeForm;
