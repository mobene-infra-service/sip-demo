import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export default function Component() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <header className="flex items-center justify-between p-4 bg-gray-100 rounded-t-md">
        <div className="flex items-center space-x-2">
          <CircleIcon className="w-4 h-4 text-gray-500" />
          <span className="text-gray-500">未登录</span>
        </div>
        <Button variant="ghost" className="flex items-center space-x-1">
          <LogInIcon className="w-4 h-4" />
          <span>登录</span>
        </Button>
      </header>
      <div className="border rounded-md">
        <Tabs defaultValue="settings">
          <TabsList className="flex p-2 bg-gray-50 border-b">
            <TabsTrigger value="settings" className="flex-1 text-center">
              参数设置
            </TabsTrigger>
            <TabsTrigger value="info" className="flex-1 text-center">
              调试信息
            </TabsTrigger>
          </TabsList>
          <TabsContent value="settings" className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="server-address">服务器地址</Label>
                <Input id="server-address" placeholder="ivr.wulicredit.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="server-port">服务器端口</Label>
                <Input id="server-port" placeholder="443" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="extension">分机号</Label>
                <Input id="extension" placeholder="1001003" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">密码</Label>
                <div className="relative">
                  <Input id="password" type="password" placeholder="********" />
                  <EyeIcon className="absolute right-2 top-2.5 w-4 h-4 text-gray-500" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="auto-answer">自动应答</Label>
                <Switch id="auto-answer" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>高级设置</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="简体中文" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zh">简体中文</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="ssl">SSL</Label>
                  <Switch id="ssl" defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="domain">Domain</Label>
                  <Input id="domain" placeholder="vwstest.mobilebene.com" />
                </div>
                <div className="space-y-2">
                  <Label>IceType</Label>
                  <RadioGroup defaultValue="stun">
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
                  <Input id="icehost" placeholder="" />
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="auto-mute">自动静音</Label>
                  <Switch id="auto-mute" />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <div className="p-4 border-t">
          <Label>历史账号</Label>
          <div className="space-y-2">
            {[
              '1001001@vwstest.mobilebene.com:5062',
              '1001002@vwstest.mobilebene.com:443',
              '1001002@ivr.wulicredit.com:443',
              '5004@ivr.wulicredit.com:443',
              '1001003@192.168.2.137:8090',
              '1001003@ivr.wulicredit.com:443',
            ].map((account, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 border rounded-md"
              >
                <span>{account}</span>
                <div className="flex space-x-2">
                  <Button variant="secondary" size="sm">
                    使用
                  </Button>
                  <Button variant="destructive" size="sm">
                    删除
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function CircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  )
}

function EyeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function LogInIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
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

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
