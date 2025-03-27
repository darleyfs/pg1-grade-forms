import http.server
import socketserver
import os

port = 8181
directory = os.path.dirname(os.path.realpath(__file__))

Handler = http.server.SimpleHTTPRequestHandler

os.chdir(directory)

with socketserver.TCPServer(("", port), Handler) as httpd:
    print(f"Serving at port {port} from {directory}")
    httpd.serve_forever()
