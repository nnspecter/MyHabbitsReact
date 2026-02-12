import { Skeleton } from '@mui/material'

export default function loading() {
  return (
    <div className='containerSkeleton'>
      <Skeleton variant="rounded" width={"100%"} height={"400px"} />
    </div>
  )
}

