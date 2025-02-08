# Establecer la imagen base
FROM node:20

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos del proyecto al contcdenedor
COPY package.json package-lock.json ./

# Instalar las dependencias
RUN npm install

# Copiar el archivo .env al contenedor
COPY .env ./

# Copiar el resto del código al contenedor
COPY . .

# Exponer el puerto que usa el servicio
EXPOSE 3000

# Comando para ejecutar el servicio
CMD ["sh", "-c", "npm uninstall --save-dev bcrypt sqlite3 && npm install bcrypt sqlite3 && npm run create-db && npm run dev"]
