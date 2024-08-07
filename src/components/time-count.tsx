import React, { useState, useEffect } from 'react'

export enum TimeAction {
  Start,
  Stop,
}

interface TimeCountProps {
  action: TimeAction
}

const TimeCount: React.FC<TimeCountProps> = ({ action }) => {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined

    if (action === TimeAction.Start) {
      setIsRunning(true)
      setTime(0)
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1)
      }, 1000)
    }

    if (action === TimeAction.Stop && isRunning) {
      setIsRunning(false)
      clearInterval(interval)
    }

    return () => {
      clearInterval(interval)
    }
  }, [action])

  const formatTime = (timeInSeconds: number): string => {
    const hours = Math.floor(timeInSeconds / 3600)
    const minutes = Math.floor((timeInSeconds % 3600) / 60)
    const seconds = timeInSeconds % 60

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return <div>{formatTime(time)}</div>
}

export default TimeCount
