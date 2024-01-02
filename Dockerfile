# Use an official Node.js runtime as a base image
FROM node:18

ENV PORT 8000
ENV SECRET_KEY matkhaubimat
ENV FLASK_API_PREDICTION https://bird-flask.onrender.com/predict

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build TypeScript code
RUN npm run build

# Expose the port that your app will run on
EXPOSE 8000

# Command to run your application
CMD ["npm", "start"]
