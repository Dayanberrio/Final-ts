# Usa una imagen base de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración de npm
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Compila el código TypeScript
RUN npm run build

# Expone el puerto que la aplicación usará
EXPOSE 3000

# Comando por defecto para ejecutar la aplicación
CMD ["npm", "start"]

