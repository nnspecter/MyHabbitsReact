import { MountAnimation } from "@/animations/MountAnimation"
import GraphicsPanel from "./GraphicsPanel/GraphicsPanel"
import MetricsPanel from "./MetricsPanel/MetricsPanel"


const Analytics = () => {
  return (
        <MountAnimation>
          <MetricsPanel/>
        </MountAnimation>
        
    
  )
}

export default Analytics