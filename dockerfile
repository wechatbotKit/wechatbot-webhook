# wine-windows 环境
FROM sureer/wine-box:8.0.2

COPY root/ /
# init with GUI and node
RUN bash -c 'nohup /entrypoint.sh 2>&1 &' && sleep 5 && /payloads.sh \
    && sudo cp -r /wechat-etc/* /etc/ \
    && sudo rm /tmp/.X0-lock

# init node-18 https://deb.nodesource.com/
RUN sudo apt-get update  \
    && sudo apt-get install -y curl gnupg ca-certificates \
    && sudo mkdir -p /etc/apt/keyrings/ \
    && curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg \
    && echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_18.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list \
    && sudo apt-get update \
    && sudo apt-get install nodejs -y

WORKDIR /node

# 非依赖变更缓存改层
COPY package.json pnpm-lock.yaml ./


# 安装应用程序依赖项
RUN npx pnpm install && npx pnpm store prune && npx clear-npx-cache

# 复制应用程序代码到工作目录
COPY . .

# 如果收消息想接入webhook
ENV RECVD_MSG_API=
# 默认登录API接口访问token
ENV LOGIN_API_TOKEN=

# 暴露端口（你的 Express 应用程序监听的端口）
EXPOSE 3001

RUN sudo cp app.conf /etc/supervisord.d/app.conf

# 启动应用程序
ENTRYPOINT ["/wx-entrypoint.sh"]