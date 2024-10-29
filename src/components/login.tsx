import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Eye, EyeOff } from 'lucide-react'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import useLoginStore from '@/store/loginInfo'
import { useState } from 'react'

const LoginComponent = () => {
  const {
    currentLoginInfo,
    setCurrentLoginInfo,
    historyLoginInfo,
    deleteLoginInfo,
  } = useLoginStore()

  // state
  const [showLoginPassword, setShowLoginPassword] = useState(false)

  // 当所有currentLoginInfo的值改变时，更新store中的currentLoginInfo
  const handleCurrentLoginInfoChange = (key: string, value: any) => {
    // 如果值是字符串类型，去除所有空格
    const processedValue = typeof value === 'string' ? value.replace(/\s+/g, '') : value
    setCurrentLoginInfo({
      ...currentLoginInfo,
      [key]: processedValue,
    })
  }

  return (
    <div className="border rounded-md">
      <Tabs defaultValue="settings">
        <TabsList className="flex p-2 bg-gray-50 border-b">
          <TabsTrigger value="settings" className="flex-1 text-center">
            Params
          </TabsTrigger>
          <TabsTrigger value="info" className="flex-1 text-center">
            Debug Info
          </TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="server-address">Server</Label>
              <Input
                id="server-address"
                placeholder="input your server location"
                value={currentLoginInfo.host}
                onChange={(e) => {
                  handleCurrentLoginInfoChange('host', e.target.value)
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="server-port">Port</Label>
              <Input
                id="server-port"
                placeholder="port"
                value={currentLoginInfo.port}
                onChange={(e) => {
                  handleCurrentLoginInfoChange('port', e.target.value)
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="extension">Extension Number</Label>
              <Input
                id="extension"
                placeholder="Extension Number"
                value={currentLoginInfo.extNo}
                onChange={(e) => {
                  handleCurrentLoginInfoChange('extNo', e.target.value)
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showLoginPassword ? "text" : "password"}
                  placeholder="input your password"
                  value={currentLoginInfo.extPwd}
                  onChange={(e) => {
                    handleCurrentLoginInfoChange('extPwd', e.target.value)
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showLoginPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="auto-answer">auto response</Label>
              <Switch
                id="auto-answer"
                checked={currentLoginInfo.autoAnswer}
                onCheckedChange={(v) => {
                  handleCurrentLoginInfoChange('autoAnswer', v)
                }}
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select
                  defaultValue="en"
                  value={currentLoginInfo.lang}
                  onValueChange={(v) => {
                    handleCurrentLoginInfoChange('lang', v)
                  }}
                >
                  <SelectTrigger id="language">
                    <SelectValue placeholder="English" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    {/* <SelectItem value="zh">简体中文</SelectItem> */}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="ssl">SSL</Label>
                <Switch
                  id="ssl"
                  defaultChecked
                  checked={currentLoginInfo.proto}
                  onCheckedChange={(v) => {
                    handleCurrentLoginInfoChange('proto', v)
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="domain">Domain</Label>
                <Input
                  id="domain"
                  placeholder="your domain"
                  value={currentLoginInfo.domain}
                  onChange={(e) => {
                    if (e.target.value) {
                      handleCurrentLoginInfoChange('domain', e.target.value)
                    }
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>IceType</Label>
                <RadioGroup
                  defaultValue="stun"
                  value={currentLoginInfo.stun?.type}
                  onValueChange={(v) => {
                    const tempStun = {
                      ...currentLoginInfo.stun,
                      type: v,
                    }
                    handleCurrentLoginInfoChange('stun', tempStun)
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="stun" id="stun" />
                    <Label htmlFor="stun">STUN</Label>
                    <RadioGroupItem value="turn" id="turn" />
                    <Label htmlFor="turn">TURN</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="icehost">IceHost</Label>
                <Input
                  id="icehost"
                  placeholder=""
                  value={currentLoginInfo.stun.host}
                  onChange={(e) => {
                    if (e.target.value) {
                      const tempStun = {
                        ...currentLoginInfo.stun,
                        host: e.target.value,
                      }
                      handleCurrentLoginInfoChange('stun', tempStun)
                    }
                  }}
                />
              </div>
              {currentLoginInfo?.stun?.type === 'turn' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="extension">Username</Label>
                    <Input
                      id="extension"
                      value={currentLoginInfo.stun.username}
                      onChange={(e) => {
                        const tempStun = {
                          ...currentLoginInfo.stun,
                          username: e.target.value,
                        }
                        handleCurrentLoginInfoChange('stun', tempStun)
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Credential</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type="password"
                        value={currentLoginInfo.stun.password}
                        onChange={(e) => {
                          const tempStun = {
                            ...currentLoginInfo.stun,
                            password: e.target.value,
                          }
                          handleCurrentLoginInfoChange('stun', tempStun)
                        }}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="flex items-center space-x-2">
                <Label htmlFor="auto-mute">auto mute</Label>
                <Switch
                  id="auto-mute"
                  defaultChecked={false}
                  checked={currentLoginInfo.autoMute}
                  onCheckedChange={(v) => {
                    handleCurrentLoginInfoChange('autoMute', v)
                  }}
                />
              </div>
            </div>
          </div>

          <div className="p-4 border-t">
            <Label>History Account</Label>
            <div className="space-y-2">
              {historyLoginInfo.map((account, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 border rounded-md"
                >
                  <span>{`${account.extNo}@${account.host}:${account.port}`}</span>
                  <div className="flex space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        setCurrentLoginInfo(account)
                      }}
                    >
                      Use
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        deleteLoginInfo(account.extNo)
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="info" className="p-4 space-y-4">
          // TODO
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default LoginComponent
