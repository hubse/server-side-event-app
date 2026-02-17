# Server-Sent Events (SSE) Demo

This is a simple demonstration of Server-Sent Events (SSE) using Node.js built-in `http` module. Server-Sent Events is a technology that enables a server to push data to a client over HTTP in a one-way communication pattern.

## Overview

This demo showcases:
- How to create a server that streams real-time data to clients
- How to use the EventSource API on the client side to receive server-pushed messages
- Proper cleanup of resources when clients disconnect

## Features

- **Real-time Updates**: Server pushes the current timestamp to all connected clients every second
- **Multiple Client Support**: Multiple clients can connect simultaneously and each receives independent updates
- **Auto-reconnection**: The EventSource API automatically handles reconnection if the connection is lost
- **Resource Management**: Proper cleanup of intervals when clients disconnect

## How It Works

### Server Side (`demo.js`)

1. Creates an HTTP server using Node.js built-in `http` module
2. For `/events` route:
   - Sets appropriate headers for SSE (`Content-Type: text/event-stream`)
   - Sets up a `setInterval` to send data every 1000ms
   - Sends data in SSE format: `data: <JSON>\n\n`
   - Cleans up the interval when the client disconnects

3. For `/` route:
   - Serves an HTML page with JavaScript that connects to `/events`
   - Uses `EventSource` API to receive real-time updates
   - Displays received timestamps on the page

### Client Side

- Uses the native `EventSource` API (no external libraries needed)
- `onmessage` handler processes incoming data
- `onerror` handler logs connection errors

## Running the Demo

1. Make sure you have Node.js installed
2. Run the server:
   ```bash
   node demo.js
   ```
3. Open your browser and navigate to: `http://localhost:3000`
4. You should see timestamps appearing on the page every second

## SSE Format

Server-Sent Events follow a specific format:

```
data: <message>\n\n
```

Multiple lines can be used for different event types:
- `data:` - The message payload
- `event:` - Custom event name
- `id:` - Event ID for reconnection
- `retry:` - Reconnection timeout in milliseconds

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (since Safari 4)

## Use Cases

Server-Sent Events are ideal for:
- Real-time dashboards and monitoring
- Live notifications
- Social media feeds updates
- Stock ticker updates
- Server health monitoring

## Advantages of SSE over WebSockets

- Simpler to implement
- Works over standard HTTP/HTTPS
- Automatic reconnection
- No need for external libraries
- One-way communication (server to client) is built-in

## License

MIT

