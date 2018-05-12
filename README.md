Drachtio Sandbox
---

Voip mash potatoes

- p2p
- register
- invite

Getting Started
---------------
Debug with Cerebral Debugger 
https://github.com/cerebral/cerebral-debugger/releases

<img src="https://user-images.githubusercontent.com/2431354/37635373-7207750c-2bb8-11e8-8691-085576c81b41.png" width="640px"/>

```sh
# clone it
git clone git@github.com:andrewvmail/drachtio-sandbox.git
cd drachtio-sandbox
npm install


# Get drachtio docker and run it
docker run --rm --name drachtio -p 5060:5060 -p 9022:9022 drachtio/drachtio-server drachtio --contact "sip:*;transport=tcp,udp"

# Start development live-reload server
# CEREBRAL_DEBUGGER=IP_OF_DEBUGGER:PORT npm run dev
CEREBRAL_DEBUGGER=192.168.50.197:8585 npm run dev

# Start production server:
PORT=8080 npm start

```

Docker Support
------
```sh
cd drachtio-sandbox

# Build your docker
docker build -t tagname/drachtio-sandbox .
#            ^      ^           ^
#          tag  tag name      Dockerfile location

# run your docker
docker run -p 8080:8080 tagname/drachtio-sandbox
#                 ^            ^
#          bind the port    container tag
#          to your host
#          machine port   

```

License
-------

MIT
