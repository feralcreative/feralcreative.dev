import http.server
import socketserver
import urllib.parse
class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Parse the URL and query parameters
        parsed_path = urllib.parse.urlparse(self.path)
        query_params = urllib.parse.parse_qs(parsed_path.query)
        # Example: Accessing a parameter named 'param'
        param_value = query_params.get('param', [None])[0]
        
        # Respond with the parameter value
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        self.wfile.write(f"<html><body><h1>Parameter Value: {param_value}</h1></body></html>".encode('utf-8'))
# Set the port and directory
PORT = 31875
DIRECTORY = "~/Documents/_www/localhost/callback"
# Change to the specified directory
import os
os.chdir(os.path.expanduser(DIRECTORY))
# Start the server
with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
    print(f"Serving at port {PORT}")
    httpd.serve_forever()