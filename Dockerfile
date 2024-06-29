FROM phusion/baseimage:focal-1.2.0

ENV DEBIAN_FRONTEND=noninteractive
ENV LC_ALL=en_US.UTF-8
ENV LANG=en_US.UTF-8
ENV LANGUAGE=en_US.UTF-8
ENV WINEARCH=win32
ENV DISPLAY=:0.0
ENV WINEPREFIX=/home/docker/.wine
ENV HOME=/home/docker/
ENV NOVNC_HOME=/usr/libexec/noVNCdim
ENV NODE_VERSION 18.14.1
ENV PATH="/usr/local/lib/nodejs/node-v$NODE_VERSION-linux-x64/bin:${PATH}"

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    language-pack-zh-hant \
    x11vnc \
    xdotool \
    wget \ 
    supervisor \ 
    fluxbox \
    git \ 
    sudo \
    apt-transport-https \
    ca-certificates \
    cabextract \
    gnupg \
    gpg-agent \
    locales \
    p7zip \
    pulseaudio \
    pulseaudio-utils \
    tzdata \
    unzip \ 
    xz-utils \
    winbind \
    zenity \
    libx11-dev \
    libfreetype6-dev \
    libgl1-mesa-dri \
    libgl1-mesa-glx \
    xvfb \
    ttf-mscorefonts-installer && \
    dpkg --add-architecture i386 && \
    curl https://dl.winehq.org/wine-builds/winehq.key -o /tmp/Release.key && \
    apt-get install -y --no-install-recommends software-properties-common && \
    apt-key add /tmp/Release.key && \
    apt-add-repository 'https://dl.winehq.org/wine-builds/ubuntu/' && \
    add-apt-repository ppa:cybermax-dexter/sdl2-backport && \
    apt-get update && \
    apt-get install -y --no-install-recommends winehq-staging python3 && \
    curl -SL -k https://raw.githubusercontent.com/Winetricks/winetricks/master/src/winetricks -o /usr/local/bin/winetricks && \
    chmod a+x /usr/local/bin/winetricks && \
    adduser --home /home/docker --disabled-password --shell /bin/bash --gecos "user for running application" --quiet docker && \
    echo "docker:1234" | chpasswd && \
    adduser docker sudo && \
    mkdir -p "${NOVNC_HOME}"/utils/websockify && \
    curl -L https://github.com/novnc/noVNC/archive/v1.3.0.tar.gz | tar xz --strip 1 -C "${NOVNC_HOME}" && \
    curl -L https://github.com/novnc/websockify/archive/v0.10.0.tar.gz | tar xz --strip 1 -C "${NOVNC_HOME}"/utils/websockify && \
    chmod +x -v "${NOVNC_HOME}"/utils/novnc_proxy && \
    ln -s "${NOVNC_HOME}"/vnc.html "${NOVNC_HOME}"/index.html && \
    chown -R docker "${NOVNC_HOME}" && \
    apt-get autoremove -y --purge && \
    apt-get clean -y && \
    rm -rf /home/wine/.cache && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

COPY . /home/docker/node

RUN curl -fsSL https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz -o node.tar.xz \
    && mkdir -p /usr/local/lib/nodejs \
    && tar -xJf node.tar.xz -C /usr/local/lib/nodejs \
    && rm node.tar.xz \
    && cd /home/docker/node && npm i yarn -g && yarn && yarn cache clean && npm uninstall yarn -g \
    && ln -s /usr/local/lib/nodejs/node-v$NODE_VERSION-linux-x64/bin/node /usr/bin/node \
    && ln -s /usr/local/lib/nodejs/node-v$NODE_VERSION-linux-x64/bin/npm /usr/bin/npm \
    && ln -s /usr/local/lib/nodejs/node-v$NODE_VERSION-linux-x64/bin/npx /usr/bin/npx

RUN wget -O /home/docker/WeChatSetup-3.9.2.23.exe https://github.com/tom-snow/wechat-windows-versions/releases/download/v3.9.2.23/WeChatSetup-3.9.2.23.exe

COPY linux/bin /bin
COPY linux/.fluxbox /home/docker/.fluxbox
COPY linux/conf.d/* /etc/supervisor/conf.d/
COPY linux/sh/entrypoint.sh /etc/entrypoint.sh


RUN chmod +x /etc/entrypoint.sh

ENTRYPOINT ["/bin/bash","/etc/entrypoint.sh"]

EXPOSE 8080 22 3001
