#!/bin/bash

# 服务器配置
SERVER_IP="47.251.106.197"
SSH_USER="root"              # 请根据实际情况修改用户名
TARGET_PATH="/srv/demo/new/" # 请根据实际情况修改部署路径

# 设置严格权限
chmod 600 deploy-key.pem
ssh-keygen -R ${SERVER_IP} 2>/dev/null || true

# 使用rsync同步文件到服务器
rsync -avz -e "ssh -i deploy-key.pem -o StrictHostKeyChecking=no" \
  --delete --progress dist/ \
  ${SSH_USER}@${SERVER_IP}:${TARGET_PATH}

# 检查执行结果
if [ $? -eq 0 ]; then
  echo "✅ 部署成功"
else
  echo "❌ 部署失败"
  exit 1
fi
