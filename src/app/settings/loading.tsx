import { Skeleton } from '@mui/material'

export default function loading() {
  return (
    <div>
      <div className='containerSkeleton'>
        <Skeleton variant="rounded" width={"100%"} height={"150px"} />
      </div>
      <div className='containerSkeleton' style={{marginTop: "30px"}}>
        <Skeleton variant="rounded" width={"100%"} height={"300px"} />
      </div>
    </div>
  )
}

