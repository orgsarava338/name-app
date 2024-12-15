# Use the lightweight Bun image
FROM oven/bun:canary-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only the essential files to leverage Docker caching
COPY package.json bun.lockb ./

# Install dependencies using Bun
RUN bun install --production

# Copy the rest of the application code
COPY . .

# Build the application (assuming you have a `build` script in package.json)
RUN bun run build

# Expose the port your app will run on (e.g., 3000)
EXPOSE 8070

# Command to start the application
CMD ["bun", "run", "prod"]