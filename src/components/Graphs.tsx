import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import styles from "../styles/Device.module.css";

function Graphs({ data }) {

  return (
    <div className={styles.container}>
      <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="ping" stroke="#8884d8" />
        <Line type="monotone" dataKey="strength" stroke="#82ca9d" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis />
        <YAxis />
        <Tooltip />
        <Legend />
      </LineChart>
    </div>
  );
}

export default Graphs;