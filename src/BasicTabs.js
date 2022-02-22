import { useState, useEffect } from 'react';

import Canvas from './Canvas'
import axios from 'axios';

export function TabPanel(props) {
  const { children, index, ...other } = props;

  const fileName =  index

  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      await axios(
        `http://localhost:3001/files/` + fileName,
      ).then(response => {
        setData(response.data)
      })
        .catch(error => {
          console.error("error fetching data: ", error);
        })
        .finally(() => {
          setLoading(false)
        })
    };

    fetchData();
  }, []);
  if (loading) return "loading..."
  return (
    <div
      role="tabpanel"
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}

    >
      <Canvas recipe={data} rcpName={fileName} index={index} />
    </div>
  );
}