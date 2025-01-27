# 使用官方nginx镜像作为基础镜像
FROM nginx:alpine

# 删除默认的nginx配置文件
RUN rm /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/nginx.conf

# 复制自定义的nginx配置文件到容器中
COPY nginx.conf /etc/nginx/nginx.conf

# 创建存放网站文件的目录
RUN mkdir -p /usr/share/nginx/html

# 复制index.html文件到容器中
COPY dist/index.html /usr/share/nginx/html/

# 设置工作目录
WORKDIR /usr/share/nginx/html

# 暴露80端口
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]
