import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';


// #region Sample data
const data = [
  {
    subject: 'Math',
    A: 120,
    fullMark: 150,
  },
  {
    subject: 'Chinese',
    A: 98,
    fullMark: 150,
  },
  {
    subject: 'English',
    A: 86,
    fullMark: 150,
  },
  {
    subject: 'Geography',
    A: 99,
    fullMark: 150,
  },
  {
    subject: 'Physics',
    A: 85,
    fullMark: 150,
  },
  {
    subject: 'History',
    A: 65,
    fullMark: 150,
  },
];

// #endregion
const SimpleRadarChart = () => {
  return (
    <RadarChart
      style={{ width: '100%', height: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }}
      responsive
      outerRadius="80%"
      data={data}
      margin={{
        top: 20,
        left: 20,
        right: 20,
        bottom: 20,
      }}
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis />
      <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      
    </RadarChart>
  );
};

export default SimpleRadarChart;