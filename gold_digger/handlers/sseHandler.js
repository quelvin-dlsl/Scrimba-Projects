import config from '../config/config.js';

class SSEHandler {
    constructor() {
        this.clients = [];
    }

    handleConnection(req, res, currentPrice) {
        res.writeHead(200, config.sse.headers);

        this.sendPrice(res, currentPrice);

        this.clients.push(res);

        console.log(`New SSE client connected. Total clients: ${this.clients.length}`);

        req.on('close', () => {
            this.clients = this.clients.filter(client => client !== res);
            console.log(`SSE client disconnected. Total clients: ${this.clients.length}`);
        });
    }

    sendPrice(client, price) {
        try {
            client.write(`data: ${JSON.stringify({ price })}\n\n`);
        } catch (error) {
            console.error('Error sending price to client:', error);
        }
    }

    broadcast(price) {
        const deadClients = [];

        this.clients.forEach((client, index) => {
            try {
                client.write(`data: ${JSON.stringify({ price })}\n\n`);
            } catch (error) {
                console.error(`Error broadcasting to client ${index}:`, error);
                deadClients.push(client);
            }
        });

        if (deadClients.length > 0) {
            this.clients = this.clients.filter(client => !deadClients.includes(client));
        }
    }

    getClientCount() {
        return this.clients.length;
    }

    disconnectAll() {
        this.clients.forEach(client => {
            try {
                client.end();
            } catch (error) {
                console.error('Error closing client connection:', error);
            }
        });
        this.clients = []
    }
}

export default SSEHandler