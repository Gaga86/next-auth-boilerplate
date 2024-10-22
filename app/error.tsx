'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
import { Button } from '@/app/_components/ui/button'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className='flex flex-col items-center'>
      <h2 className='font-bold text-xl pb-6'>{error.message}</h2>
      <Button
        variant="secondary"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Please try again
      </Button>
    </div>
  )
}