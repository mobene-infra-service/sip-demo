import LoginComponent from '@/components/login'
import Dialpad from '@/components/dialpad'
import useStore from '@/store'
import SipClient from 'sip-call-ring'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Spinner from '@/components/spin'
import { toast } from 'sonner'

function App() {
  const { loginStatus, setLogStatus, currentLoginInfo, addHistoryLoginInfo } =
    useStore()
  const [loading, setLoading] = useState(false)
  const [sipClient, setSipClient] = useState<SipClient | null>(null)

  const [state, setState] = useState<SipStateType>({
    statusIsring: false, //是否在振铃中
    statusIsCall: false, //是否在拨打中
    statusIsHold: false, //是否在保持中

    callDirection: '', //呼叫方向

    agentNo: '', //分机号
    discaller: '', //主叫号码
    discallee: '', //被叫号码

    historyAccounts: [], //历史账号列表
    lastAccount: '', //最后一次使用的账号配置

    networkSpeed: 0, //网速
    testMicrophoneOb: null,
    testMicrophoneVolume: 0,
    mediaDevices: null,

    latency_stat: undefined,
    autoAnswer: false, //自动接听
    autoDisableMic: false, //自动静音
    disableMic: false, //静音

    loading: null,
    locale: 'zh',
    locales: [
      { label: '简体中文', value: 'zh' },
      { label: 'English', value: 'en' },
      { label: 'Spanish', value: 'es' },
      { label: 'Portuguese', value: 'pt' },
    ],
    callEndInfo: undefined,
    sipStatus: 0,
  })

  useEffect(() => {
    // 每次刷新保证登出
    setLogStatus(false)
    SipClient.getMediaDeviceInfo().then((res: any) => {
      setState({
        ...state,
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

  const mute = () => {
    if (state.disableMic) {
      sipClient?.unmute()
    } else {
      sipClient?.mute()
    }
  }

  //麦克风音量检测-开始
  // const testMicrophoneHandelStart = () => {
  //   SipClient?.testMicrophone((volume: any) => {
  //     setState({
  //       ...state,
  //       testMicrophoneVolume: volume,
  //     })
  //   }).then((res: any) => {
  //     setState({
  //       ...state,
  //       testMicrophoneOb: res,
  //     })
  //   })
  // }

  //麦克风音量检测-结束
  // const testMicrophoneHandelStop = () => {
  //   if (state.testMicrophoneOb) {
  //     state.testMicrophoneOb?.yes()
  //     setState({
  //       ...state,
  //       testMicrophoneVolume: 0,
  //       testMicrophoneOb: null,
  //     })
  //   }
  // }

  const stateEventListener = (event: any, data: any) => {
    console.log('收到事件:', event, data)
    switch (event) {
      case 'ERROR':
        toast.error(data.msg)
        setLoading(false)
        setLogStatus(false)
        break
      case 'DISCONNECTED':
        setLogStatus(false)
        setLoading(false)
        toast.info('Disconnected')
        break
      case 'REGISTERED':
        setLogStatus(true)
        setLoading(false)
        setState({
          ...state,
          agentNo: data.localAgent,
        })
        break
      case 'UNREGISTERED':
        setState({
          ...state,
          statusIsHold: false,
          statusIsring: false,
          statusIsCall: false,
          disableMic: false,
          latency_stat: undefined,
          callEndInfo: undefined,
        })
        setLogStatus(false)
        break
      case 'INCOMING_CALL':
        setState({
          ...state,
          callEndInfo: undefined,
          statusIsring: true,
          callDirection: data.direction,
        })
        if (state.autoAnswer) {
          //自动应答
          sipClient?.answer()
        }
        break
      // this.playRingMedia();
      case 'OUTGOING_CALL':
        setState({
          ...state,
          callEndInfo: undefined,
          statusIsring: true,
          callDirection: data.direction,
          discaller: data.otherLegNumber,
          discallee: state.agentNo,
        })
        break
      case 'IN_CALL':
        if (state.autoDisableMic) {
          //自动禁音
          sipClient?.mute()
        }
        setState({
          ...state,
          statusIsring: false,
          statusIsCall: true,
          statusIsHold: false,
        })
        break
      case 'CALL_END':
        setState({
          ...state,
          statusIsring: false,
          statusIsCall: false,
          statusIsHold: false,
          disableMic: false,
          latency_stat: undefined,
          callEndInfo: data,
        })
        break
      case 'HOLD':
        setState({
          ...state,
          statusIsHold: true,
        })
        break
      case 'UNHOLD':
        setState({
          ...state,
          statusIsHold: false,
        })
        break
      case 'MUTE':
        setState({
          ...state,
          disableMic: true,
        })
        break
      case 'UNMUTE':
        setState({
          ...state,
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
        setState({
          ...state,
          latency_stat: data,
        })
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
            {loginStatus ? `${state.agentNo}: Logged in` : 'Not Logged'}
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
