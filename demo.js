const http = require("http");

const server = http.createServer((req, res) => 
{

    if (req.url === "/events") {

      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Access-Control-Allow-Origin": "*"
      });


      // Send a message every second
      const intervalId = setInterval(() => {

        const data = {
          time: new Date().toISOString()
        };

        res.write(`data: ${JSON.stringify(data)}\n\n`);

      }, 1000);


      // Clean up when client disconnects
      req.on("close", () => {
        clearInterval(intervalId);
        res.end();
        console.log("client disconnected........")
      });

    }
    else 
      {

        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`
        <!DOCTYPE html>
        <html>
        <body>d
          <h1>SSE Demo</h1>
          <div id="output"></div>

          <script>
            const output = document.getElementById("output");
            const eventSource = new EventSource("/events");

            eventSource.onmessage = function(event) {
              const data = JSON.parse(event.data);
              output.innerHTML += "<p>" + data.time + "</p>";
            };

            eventSource.onerror = function(err) {
              console.error("EventSource failed:", err);
            };
          </script>
        </body>
        </html>
      `);
    }

});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});