import axios from 'axios'

export default axios.create({
    baseURL: 'http://localhost:3500'
})




const API_URL = "http://localhost:3500";
const [flightDetails, setFlightDetails] = useState([]);
const [fetchError, setFetchError] = useState(null);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const fetchFlightDetails = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw Error('Data unexpected')
      const flightDetails = await response.json();
      console.log(flightDetails);
      setFlightDetails(flightDetails);
      set
    } catch (err) {
      console.log(err.stack);
    }
  };

  (async () => await fetchFlightDetails())();
}, []);
