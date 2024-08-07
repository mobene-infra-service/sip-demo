import LoginComponent from '@/components/login'
import Dialpad from '@/components/dialpad'
import useStore from '@/store'
import useLoginStore from '@/store/loginInfo'
import SipClient from 'sip-call-ring'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Spinner from '@/components/spin'
import { toast } from 'sonner'
import { TimeAction } from '@/components/time-count'

function App() {
  const {
    loginStatus,
    setLogStatus,
    sipState,
    setSipState,
    setLantencyStat,
    setDiscallee,
    setCountTimeAction,
  } = useStore()
  const { currentLoginInfo, addHistoryLoginInfo } = useLoginStore()
  const [loading, setLoading] = useState(false)
  const [sipClient, setSipClient] = useState<SipClient | null>(null)

  useEffect(() => {
    SipClient.getMediaDeviceInfo().then((res: any) => {
      setSipState({
        ...sipState,
        mediaDevices: res,
      })
    })
  }, [])

  const login = () => {
    if (
      currentLoginInfo.host &&
      currentLoginInfo.extNo &&
      currentLoginInfo.extPwd
    ) {
      const configure = {
        ...currentLoginInfo,
        stateEventListener: stateEventListener,
      }
      setLoading(true)
      const client = new SipClient(configure as any)
      setSipClient(client)
      addHistoryLoginInfo(currentLoginInfo)
    } else {
      toast.error('Please fill in the login information')
    }
  }

  const logout = () => {
    sipClient?.unregister()
  }

  const stateEventListener = (event: any, data: any) => {
    console.log('收到事件:', event, data)
    switch (event) {
      case 'ERROR':
        toast.error(data.msg)
        setLoading(false)
        break
      case 'DISCONNECTED':
        setLogStatus(false)
        setLoading(false)
        toast.info('Disconnected')
        break
      case 'REGISTERED':
        setLogStatus(true)
        setLoading(false)
        setSipState({
          ...sipState,
          agentNo: data.localAgent,
        })
        break
      case 'UNREGISTERED':
        setSipState({
          ...sipState,
          statusIsHold: false,
          statusIsring: false,
          statusIsCall: false,
          disableMic: false,
          callEndInfo: undefined,
        })
        setLantencyStat(undefined)
        setLogStatus(false)
        break
      case 'INCOMING_CALL':
        setSipState({
          ...sipState,
          callEndInfo: undefined,
          statusIsring: true,
          callDirection: data.direction,
        })
        if (sipState.autoAnswer) {
          //自动应答
          sipClient?.answer()
        }
        break
      // this.playRingMedia();
      case 'OUTGOING_CALL':
        setCountTimeAction(TimeAction.Start)
        setSipState({
          ...sipState,
          callEndInfo: undefined,
          statusIsring: true,
          callDirection: data.direction,
          discaller: data.otherLegNumber,
        })
        setDiscallee(sipState.agentNo)
        break
      case 'IN_CALL':
        if (sipState.autoDisableMic) {
          //自动禁音
          sipClient?.mute()
        }
        setCountTimeAction(TimeAction.Start)
        setSipState({
          ...sipState,
          statusIsring: false,
          statusIsCall: true,
          statusIsHold: false,
        })
        break
      case 'CALL_END':
        setSipState({
          ...sipState,
          statusIsring: false,
          statusIsCall: false,
          statusIsHold: false,
          disableMic: false,
          callEndInfo: data,
        })
        setCountTimeAction(TimeAction.Stop)
        setLantencyStat(undefined)
        break
      case 'HOLD':
        setSipState({
          ...sipState,
          statusIsHold: true,
        })
        break
      case 'UNHOLD':
        setSipState({
          ...sipState,
          statusIsHold: false,
        })
        break
      case 'MUTE':
        setSipState({
          ...sipState,
          disableMic: true,
        })
        break
      case 'UNMUTE':
        setSipState({
          ...sipState,
          disableMic: false,
        })
        break
      case 'CONNECTED':
        setLoading(false)
        break
      case 'DISCONNECT':
        console.log('DISCONNECT', data.msg)
        break
      case 'RECONNECT':
        break
      case 'REGISTER_FAILED':
        setLogStatus(false)
        setLoading(false)
        toast.error('Register failed')
        break
      case 'LATENCY_STAT':
        setLantencyStat(data)
        break
      case 'MIC_ERROR':
        toast.error(data.msg)
        break
      default:
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <header className="flex items-center justify-between p-4 bg-gray-100 rounded-t-md">
        <div className="flex items-center space-x-2">
          <CircleIcon
            className={`w-4 h-4 `}
            fill={loginStatus ? 'green' : 'gray-500'}
          />
          <span className="text-gray-500">
            {loginStatus
              ? `${currentLoginInfo.extNo}: Logged in`
              : 'Not Logged'}
          </span>
        </div>
        {loginStatus ? (
          <Button
            variant="ghost"
            className="flex items-center space-x-1"
            onClick={logout}
          >
            <LogInIcon className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        ) : (
          <Button
            variant="ghost"
            className="flex items-center space-x-1"
            onClick={login}
          >
            <LogInIcon className="w-4 h-4" />
            <span>Login</span>
          </Button>
        )}
      </header>

      {loginStatus ? (
        // 检测sipClient是否存在
        sipClient && (
          <>
            <Dialpad sipClient={sipClient} />
          </>
        )
      ) : (
        <>
          {loading ? (
            <div className="flex flex-row justify-center items-center h-[500px]">
              <Spinner size={80} />
            </div>
          ) : (
            <LoginComponent />
          )}
        </>
      )}
    </div>
  )
}

function CircleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={props.fill || 'none'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  )
}

function LogInIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" x2="3" y1="12" y2="12" />
    </svg>
  )
}

export default App
