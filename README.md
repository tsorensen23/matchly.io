1. Install [Docker Toolbox](https://www.docker.com/toolbox).
2. `docker-machine create -d virtualbox default` Start the machine if you need to.
3. `docker-machine env default` Run the command that it says at the bottom.
4. `docker-compose up` This may take a while, but yes it is working.
5. Run `docker-machine ip default` and enter that ip in browser. 
