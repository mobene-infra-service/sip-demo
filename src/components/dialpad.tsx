import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import SipClient from 'sip-call-ring'
import useStore from '@/store'

// 1: 离线, 2: 空闲, 3: 响铃中, 4: 通话中, 5: 摘机中, 6: 小休中 7:转接中
const statusMap: { [key: number]: string } = {
  0: '未连接',
  1: '离线',
  2: '空闲',
  3: '响铃中',
  4: '通话中',
  5: '摘机中',
  6: '小休中',
  7: '转接中',
}

const Dialpad = (props: { sipClient: SipClient }) => {
  const { sipClient } = props
  // store
  const { sipState, latency_stat } = useStore()

  // state
  const [phoneNumber, setPhoneNumber] = useState('')
  const [sipStatus, setSipStatus] = useState<number>(0)
  const [transferModalVisible, setTransferModalVisible] =
    useState<boolean>(false)
  const [transferNumber, setTransferNumber] = useState<string>('')
  // const [callbackInfo, setCallbackInfo] = useState<string>('')

  // const checkPhoneNumber = (phoneNumber: string) => {
  //   // 保证电话号码只包含数字、*、#字符
  //   const reg = /^[0-9*#]*$/
  //   return reg.test(phoneNumber)
  // }

  const openTransferDialog = () => {
    setTransferModalVisible(true)
  }

  const transferCall = () => {
    if (transferNumber === '') {
      return toast.error('请输入转接号码')
    }
    sipClient?.transferCall(transferNumber)
    setTransferNumber('')
    setTransferModalVisible(false)
  }

  const setResting = () => {
    sipClient?.setResting()
  }

  const setIdle = () => {
    sipClient?.setIdle()
  }
  const answer = () => {
    sipClient?.answer()
  }

  const hold = () => {
    sipClient?.hold()
  }

  const unhold = () => {
    sipClient?.unhold()
  }

  const mute = () => {
    if (sipState.disableMic) {
      sipClient?.unmute()
    } else {
      sipClient?.mute()
    }
  }

  const makeCall = () => {
    sipClient?.call(phoneNumber.trim())
  }

  const hangup = () => {
    sipClient?.hangup()
  }

  useEffect(() => {
    let timer: NodeJS.Timeout | null
    const handleStatusChange = () => {
      if (sipClient && sipClient?.getSipStatus) {
        // 实时更新sip status状态
        timer = setInterval(() => {
          setSipStatus(sipClient?.getSipStatus())
        }, 1000)
      }
    }

    handleStatusChange()

    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [])

  return (
    <div className="flex flex-col w-full">
      <div>
        {latency_stat !== undefined && (
          <>
            <div>Delay: {latency_stat?.latencyTime}ms</div>
            <div>
              PacketLoss:
              {(latency_stat.upLossRate * 100).toFixed(2)}% /
              {(latency_stat.downLossRate * 100).toFixed(2)}%
            </div>
            <Progress
              value={latency_stat.upAudioLevel * 100}
              max={100}
              className="w-full"
            />
          </>
        )}
      </div>
      <div className="flex  flex-row items-center justify-between h-full w-full gap-4">
        <div className="w-[48%]">
          <Input
            className="mt-8 text-2xl font-bold max-w-[500px]"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <div className="grid grid-cols-4 gap-4 mt-[20px]">
            <Button size="lg" onClick={() => setPhoneNumber(phoneNumber + '1')}>
              1
            </Button>
            <Button size="lg" onClick={() => setPhoneNumber(phoneNumber + '2')}>
              2
            </Button>
            <Button size="lg" onClick={() => setPhoneNumber(phoneNumber + '3')}>
              3
            </Button>
            <Button size="lg" onClick={() => setPhoneNumber(phoneNumber + '4')}>
              4
            </Button>
            <Button size="lg" onClick={() => setPhoneNumber(phoneNumber + '5')}>
              5
            </Button>
            <Button size="lg" onClick={() => setPhoneNumber(phoneNumber + '6')}>
              6
            </Button>
            <Button size="lg" onClick={() => setPhoneNumber(phoneNumber + '7')}>
              7
            </Button>
            <Button size="lg" onClick={() => setPhoneNumber(phoneNumber + '8')}>
              8
            </Button>
            <Button size="lg" onClick={() => setPhoneNumber(phoneNumber + '9')}>
              9
            </Button>
            <Button size="lg" onClick={() => setPhoneNumber(phoneNumber + '*')}>
              *
            </Button>
            <Button size="lg" onClick={() => setPhoneNumber(phoneNumber + '0')}>
              0
            </Button>
            <Button size="lg" onClick={() => setPhoneNumber(phoneNumber + '#')}>
              #
            </Button>
          </div>
          <div className="mt-8 flex gap-4">
            <Button onClick={makeCall}>Call</Button>
            {(sipState.statusIsring || sipState.statusIsCall) && (
              <Button
                variant="secondary"
                onClick={hangup}
                disabled={!(sipState.statusIsring || sipState.statusIsCall)}
              >
                Hang Up
              </Button>
            )}
            {sipState?.statusIsring &&
              'inbound' === sipState?.callDirection && (
                <Button
                  variant="secondary"
                  onClick={answer}
                  disabled={
                    !(
                      sipState.statusIsring &&
                      'inbound' === sipState.callDirection
                    )
                  }
                >
                  Answer
                </Button>
              )}
            {sipState?.statusIsCall && (
              <Button variant="secondary" onClick={mute}>
                {sipState.disableMic ? 'UnMute' : 'Mute'}
              </Button>
            )}
            {sipState?.statusIsCall &&
              (sipState?.statusIsHold ? (
                <Button variant="secondary" onClick={hold}>
                  Hold
                </Button>
              ) : (
                <Button variant="secondary" onClick={unhold}>
                  Retrieve
                </Button>
              ))}
          </div>
        </div>
        <div className="w-[48%] flex flex-col gap-4">
          <div className="flex flex-row justify-evenly items-center">
            <Button onClick={setResting} size="sm" variant="outline">
              Set Resting
            </Button>
            <Button onClick={setIdle} size="sm" variant="outline">
              Set Idle
            </Button>
            {sipState.statusIsCall && (
              <Button onClick={openTransferDialog} size="sm" variant="outline">
                Transfer
              </Button>
            )}
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Info</CardTitle>
              <CardDescription>
                Communication related information and status
              </CardDescription>
            </CardHeader>
            <CardContent>
              {sipState.callEndInfo !== undefined && (
                <div>{renderCallEndInfo(sipState.callEndInfo)}</div>
              )}
            </CardContent>
            <CardFooter>
              <div className="flex flex-col">
                <div>Status: {statusMap[sipStatus]}</div>

                {/* <div>CallbackInfo: {callbackInfo}</div> */}
              </div>
            </CardFooter>
          </Card>
        </div>

        <Dialog
          open={transferModalVisible}
          onOpenChange={setTransferModalVisible}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Transfer Number</DialogTitle>
              <DialogDescription>
                <Input
                  value={transferNumber}
                  onChange={(e) => {
                    if (e) {
                      setTransferNumber(e.target.value)
                    }
                  }}
                />
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={transferCall}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

const renderCallEndInfo = (callEndInfo: any) => {
  return (
    <>
      <div>
        Phone status:{' '}
        {callEndInfo?.answered ? (
          <span>Connected</span>
        ) : (
          <span>Not Connected</span>
        )}
      </div>
      <div>
        Reason:{' '}
        {callEndInfo.originator === 'remote' && (
          <span>The Other Party Hangs Up</span>
        )}
        {callEndInfo.originator === 'local' && (
          <span>Self-Initiated Hang Up</span>
        )}
      </div>
      {!callEndInfo?.answered && (
        <>
          <strong>Hang Up Reason: </strong>
          <strong>{callEndInfo?.code} </strong>
          <strong>{callEndInfo?.cause}</strong>
        </>
      )}
    </>
  )
}

export default Dialpad
