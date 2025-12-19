# Use nginx como uma imagem base
FROM nginx:latest

# Copia os arquivos da aplicação para o diretório padrão do servidor web do Nginx
COPY . /usr/share/nginx/html

# O Nginx expõe a porta 80 por padrão, onde o servidor web irá rodar
EXPOSE 80

# Commando para iniciar o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]