import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { FormControl, InputAdornment, TextField } from "@material-ui/core";
import RoomIcon from "@material-ui/icons/Room";
import CardPostalCode from "./CardPostalCode";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80vw",
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function SimpleCard() {
  const classes = useStyles();

  const [postalCode, setPostalCode] = React.useState("");
  const [error, setError] = React.useState("");
  const [results, setResults] = React.useState([]);

  const getPostalCode = async (postalCode) => {
    setResults([]);
    setError("");
    const data = await fetch(
      `https://postalcode.educavalheiro.com/api/v1/search?postalCode=${postalCode}&identify=3201f44b67d2aca36d03ba91a5deefe36c111e0f`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await data.json();

    if (result.data) {
      setResults(result.data);
    } else {
      setError(result.error);
    }
  };

  React.useEffect(() => {
    if (postalCode.length === 7) {
      getPostalCode(postalCode);
    } else {
      setResults([]);
    }
  }, [postalCode]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <FormControl fullWidth>
              <TextField
                id="standard-basic"
                onChange={(event) => setPostalCode(event.target.value)}
                label="Digite o codigo postal. Ex: 4490-155"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <RoomIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            {error && <p>{error}</p>}
            {results.length !== 0 &&
              results.map((item) => (
                <div key={item.id}>
                  <h4>ID:{item.id}</h4>
                  <p>Codigo postal: {item.CodigoPostal}</p>
                  <p>Morada: {item.Morada}</p>
                  <p>Codigo Localidade: {item.CodigoLocalidade}</p>
                  <p>Localidade: {item.Localidade}</p>
                  <p>Codigo Concelho: {item.CodigoConcelho}</p>
                  <p>Concelho: {item.Concelho}</p>
                  <p>Codigo Distrito: {item.CodigoDistrito}</p>
                  <p>Distrito: {item.Distrito}</p>
                  <p>Designacao Postal: {item.DesignacaoPostal}</p>
                </div>
              ))}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
