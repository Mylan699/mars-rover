from http.server import SimpleHTTPRequestHandler, HTTPServer

host = "0.0.0.0"
port = 8000

server = HTTPServer((host, port), SimpleHTTPRequestHandler)
print(f"Serveur démarré sur http://{host}:{port}")
server.serve_forever()
