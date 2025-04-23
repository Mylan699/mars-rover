docker build -t mars-python-server .

docker run --rm -p 8000:8000 mars-python-server

docker scout cves mars-python-server
