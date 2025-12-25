class PurchaseHandler {
    constructor(purchaseLogger) {
        this.purchaseLogger = purchaseLogger
    }

    handle(req, res, currentPrice) {
        let body = ''

        req.on('data', chunk => {
            body += chunk.toString()
        })

        req.on('end', () => {
            try{
                const purchaseData = JSON.parse(body)
                const { amount } = purchaseData

                if (!amount || amount <= 0) {
                    this.sendError(res, 'Invalid amount', 400)
                    return
                }

                const ounces = (amount / currentPrice).toFixed(4)

                this.purchaseLogger.logPurchase({
                    amount,
                    PricePerOunce: currentPrice,
                    ounces,
                    timestamp: new Date().toISOString()
                })

                this.sendSuccess(res, {
                    success: true,
                    ounces,
                    amount,
                    pricePerOunce: currentPrice
                })
            } catch (error) {
                console.error('Purchase processing error:', error)
                this.sendError(res, 'Invalid request data', 400)
            }
        })

        req.on('error', (error) => {
            console.error('Purchase request error:', error)
            this.sendError(res, 'Request error', 500)
        })
    }

    sendSuccess(res, data) {
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
        res.end(JSON.stringify(data))
    }

    sendError(res, message, statusCode = 400) {
        res.writeHead(statusCode, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
        res.end(JSON.stringify({
            success: false,
            error: message
        }))
    }
}

export default PurchaseHandler