FROM node:18-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install --production

# Copiar el resto del código
COPY . .

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["node", "server.js"]
