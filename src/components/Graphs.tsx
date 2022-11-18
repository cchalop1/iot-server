import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import styles from "../styles/Device.module.css";

const data = [{
  "ping": 343,
  "strength": -64
},
{
  "ping": 173,
  "strength": -63
},
{
  "ping": 205,
  "strength": -62
},
{
  "ping": 325,
  "strength": -61
}];

function Graphs({ }) {

  return (
    <div className={styles.container}>
      <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="ping" stroke="#8884d8" />
        <Line type="monotone" dataKey="strength" stroke="#82ca9d" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
      </LineChart>
    </div>
  );
}

export default Graphs;