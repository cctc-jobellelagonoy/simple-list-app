# Pull official base image
FROM node:20.9.0

# Set working directory in the container
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Expose port and start app
EXPOSE 3000
CMD ["npm", "start"]