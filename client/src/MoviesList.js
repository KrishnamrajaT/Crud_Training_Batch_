import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import axios from "axios";

const Test = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editMovieTitle, setEditMovieTitle] = useState(null);
  const [isShowEditBtn, setIsShowEditBtn] = useState(true);
  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem("movies");
    return savedMovies ? JSON.parse(savedMovies) : [];
  });
  const API = "https://www.freetestapi.com/api/v1/movies";

  const fetchData = () => {
    if (movies.length === 0) {
      axios
        .get(API)
        .then((res) => {
          setMovies(res.data);
          console.log(res.data);
          localStorage.setItem("movies", JSON.stringify(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  const filterMovieName = (title) => {
    setIsEdit(true);
    let findTitle = movies.filter((val) => val.id === title);
    setEditMovieTitle(findTitle);
    console.log(findTitle);
  };

  const handleOnChnage = (e) => {
    const newValue = e.target.value;
    setEditMovieTitle((prev) => {
      const updateArray = [...prev];
      updateArray[0] = {
        ...updateArray[0],
        title: newValue,
      };
      return updateArray;
    });
    setIsShowEditBtn(newValue === editMovieTitle[0].title);
    console.log(editMovieTitle);
  };

  const handleUpdate = (id) => {
    console.log(editMovieTitle);
    const UpdateData = movies.map((item) =>
      item.id === editMovieTitle[0].id
        ? { ...item, title: editMovieTitle[0].title }
        : item
    );
    setMovies(UpdateData);
    console.log(UpdateData);
    setIsEdit(false);
  };
  const handleDelete = (id) => {
    const UpdateData = movies.filter((item) => item.id !== id);
    setMovies(UpdateData);
  };
  return (
    <div>
      <Button
        size="small"
        variant="contained"
        color="error"
        sx={{ position: "fixed",zIndex:"10"  }}
        onClick={() => localStorage.clear("movies")}
      >
        clear Storage
      </Button>
      {!isEdit ? (
        <>
          {movies?.map((item) => (
            <Box sx={{ minWidth: 275, zIndex:"0" }} display={"grid"}>
              <React.Fragment>
                <CardContent>
                  <Typography sx={{marginTop:"10px"}}>{item.title}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    onClick={() => filterMovieName(item.id)}
                    size="small"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleDelete(item.id)}
                    color="error"
                    size="small"
                  >
                    Delete
                  </Button>
                </CardActions>
              </React.Fragment>
              {/* <hr /> */}
            </Box>
          ))}
        </>
      ) : (
        <>
          <Box
            component="form"
            sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Movie Title"
              variant="outlined"
              size="medium"
              defaultValue={editMovieTitle[0]?.title}
              onChange={(e) => handleOnChnage(e)}
            />
          </Box>
          <Button
            variant="contained"
            onClick={() => handleUpdate(editMovieTitle[0].id)}
            disabled={isShowEditBtn}
            size="small"
          >
            Update
          </Button>
          <Button
            variant="contained"
            onClick={() => setIsEdit(false)}
            size="small"
            color="error"
          >
            close
          </Button>
        </>
      )}
    </div>
  );
};

export default Test;
