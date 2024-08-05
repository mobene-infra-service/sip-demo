import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import SipClient from 'sip-call-ring'
import useStore from '@/store'

const Dialpad = (props: { sipClient: SipClient }) => {
  const { sipClient } = props
  // store
  const { currentLoginInfo } = useStore()

  // state
  const [phoneNumber, setPhoneNumber] = useState('')
  const [transferModalVisible, setTransferModalVisible] =
    useState<boolean>(false)
  const [transferNumber, setTransferNumber] = useState<string>('')

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

  const handleHangUpClick = () => {
    sipClient?.hangup()
  }

  const handleCallClick = () => {
    sipClient.call(phoneNumber)
  }

  const checkPhoneNumber = (phoneNumber: string) => {
    // 保证电话号码只包含数字、*、#字符
    const reg = /^[0-9*#]*$/
    return reg.test(phoneNumber)
  }

  const openTransferDialog = () => {
    setTransferModalVisible(treu)
  }

  const transferCall = () => {
    if (transferNumber === '') {
      return toast.error('请输入转接号码')
    }
    sipClient?.transferCall(transferNumber)
    setTransferModalVisible(false)
  }

  const handleClose = () => {
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

  const makeCall = (phoneNumber: string) => {
    sipClient?.call(phoneNumber.trim())
  }

  const hangup = () => {
    sipClient?.hangup()
  }

  useEffect(() => {
    if (!checkPhoneNumber(phoneNumber)) {
      toast.error('Invalid phone number')
      setPhoneNumber(phoneNumber.slice(0, -1))
    }
  }, [phoneNumber])

  return (
    <div className="flex flex-row items-center justify-between h-full gap-4">
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
          <Button onClick={handleCallClick}>Call</Button>
          <Button variant="secondary" onClick={handleHangUpClick}>
            Hang Up
          </Button>
        </div>
      </div>
      <div className="w-[48%]">
        <div className="flex flex-row">
          <Button onClick={openTransferDialog} size="sm">
            Transfer
          </Button>
          <Button onClick={openTransferDialog} size="sm">
            Transfer
          </Button>
          <Button onClick={openTransferDialog} size="sm">
            Transfer
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Dialpad
