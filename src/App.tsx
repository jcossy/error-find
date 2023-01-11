import axios from "axios";
import { useQuery } from "react-query";
import { ErrorFindData } from "./Dto";
import Home from "./Home";
import Validation, { ValidationStatus } from "./Validation";
import "./error-find.css";

const API_TIMEOUT = 5000;
const validation = new Validation();

let url = `https://mocki.io/v1/f8cc1c11-2dbb-4ac3-a655-1e88c2ab33e3`;

// url = `https://s3.eu-west-2.amazonaws.com/interview.mock.data/payload.json`;

/**
 * App - loads and validates data and coordinates home, loading and error views.
 */
export default function App(): JSX.Element {
  const { data, status } = useQuery("error-find", getApiData, {
    staleTime: Infinity, // does not fetch data again.
  });

  if (status === "success") {
    console.log(data);
    validation.isErrorFindData(data.data);
    if (validation.validationStatus === "VALID") {
      return <Home {...data.data} />;
    } else {
      <Error {...{ status: validation.validationStatus }} />;
    }
  }

  return (
    <>
      {status === "loading" && <p>Data is loading</p>}
      {status === "error" && <Error {...{ status: "UNABLE TO LOAD DATA" }} />}
    </>
  );
}

function Error({ status }: { status: ValidationStatus }) {
  return (
    <div className="home-container">
      <h1 className="home-name">Error</h1>
      <h2 className="home-name">{status}</h2>
    </div>
  );
}

function getApiData() {
  console.log("getting Data");
  return axios.get<ErrorFindData>(url, {
    headers: {
      Accept: "application/json",
    },
    timeout: API_TIMEOUT,
  });
}
