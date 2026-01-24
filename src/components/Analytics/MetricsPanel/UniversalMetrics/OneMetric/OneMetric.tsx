
interface OneMetricProps{
    name: string;
    count?: number | undefined | string;
}

const OneMetric = ({name, count}: OneMetricProps) => {
  return (
    <div style={{textAlign: "center"}}>
        <p style={{fontSize: "calc(var(--mFontSize) * 1.8)", margin: 0, fontWeight: "500", color: "var(--textColor)"}}>
          {count === undefined ? "N" : count }
        </p>
        <p className="medFont0" style={{ margin: 0, fontWeight: "500"}}>{name}</p>
    </div>
  )
}

export default OneMetric