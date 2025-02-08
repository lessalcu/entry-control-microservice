# Usa la imagen oficial de Node.js
FROM node:16

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de dependencias primero
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto en el que corre el servicio
EXPOSE 7000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
