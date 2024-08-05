import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import useStore from '@/store'

const Dialpad = (props: {
  setValue?: (v: string) => void
  hangUp: () => void
  call: (v: string) => void
  transferCall: (v: string) => void
}) => {
  const { setValue, hangUp, call } = props
  // store
  const { currentLoginInfo } = useStore()

  // state
  const [phoneNumber, setPhoneNumber] = useState('')
  const [transferModalVisible, setTransferModalVisible] =
    useState<boolean>(false)
  const [transferNumber, setTransferNumber] = useState<string>('')

  // 1: 离线, 2: 空闲, 3: 响铃中, 4: 通话中, 5: 摘机中, 6: 小休中 7:转接中
  const statusMap: { [key: number] } = {
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
    hangUp()
  }

  const handleCallClick = () => {
    call()
  }

  const checkPhoneNumber = (phoneNumber: string) => {
    // 保证电话号码只包含数字、*、#字符
    const reg = /^[0-9\*#]*$/
    return reg.test(phoneNumber)
  }

  const openTransferDialog = () => {
    setTransferModalVisible(treu)
  }

  const transferCall = () => {
    if (transferNumber === '') {
      return toast.error('请输入转接号码')
    }
    props?.transferCall(transferNumber)
    setTransferModalVisible(false)
  }

  const handleClose = () => {
    setTransferNumber('')
    setTransferModalVisible(false)
  }

  useEffect(() => {
    if (checkPhoneNumber(phoneNumber)) {
      if (setValue) {
        setValue(phoneNumber)
      }
    } else {
      toast.error('Invalid phone number')
      setPhoneNumber(phoneNumber.slice(0, -1))
    }
  }, [phoneNumber])

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Input
        className="mt-8 text-2xl font-bold max-w-[300px]"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <div className="grid grid-cols-3 gap-4 mt-[20px]">
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
  )
}

export default Dialpad
