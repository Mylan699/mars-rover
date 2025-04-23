docker network create devnet

docker network ls

docker run -dit --name conteneur1 --network devnet alpine sh
docker run -dit --name conteneur2 --network devnet alpine sh

docker exec -it conteneur1 sh

ping conteneur2

(
docker rm -f conteneur1 conteneur2
docker network rm devnet

)