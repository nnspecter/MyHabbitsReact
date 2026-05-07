import { MountAnimation } from "@/animations/MountAnimation"
import MetricsPanel from "./MetricsPanel/MetricsPanel"


export const Analytics = () => {
  return (
        <MountAnimation>
          <MetricsPanel/>
        </MountAnimation>
  )
}