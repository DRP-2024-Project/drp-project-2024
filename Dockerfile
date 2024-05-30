FROM node:20.10.0

# Copy the rest of the project files to the working directory
COPY . .

WORKDIR drp-backend/

# Install the dependencies
RUN npm install

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to run the application
CMD ["node", "app.js"]
