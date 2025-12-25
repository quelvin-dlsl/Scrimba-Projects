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

                const numericAmount = parseFloat(amount)

                if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
                    console.error('Invalid amount:', amount)
                    this.sendError(res, 'Invalid amount', 400)
                    return
                }

                if (!currentPrice || currentPrice <= 0){
                    console.error('Invalid Price:', currentPrice)
                    this.sendError(res, 'Price data unavailable', 503)
                    return
                }

                const ounces = (numericAmount / currentPrice).toFixed(4)
                console.log(`Calculation: £${numericAmount} ÷ £${currentPrice}/oz = ${ounces} oz`)

                this.purchaseLogger.logPurchase({
                    amount: numericAmount,
                    PricePerOunce: currentPrice,
                    ounces,
                    timestamp: new Date().toISOString()
                })

                this.sendSuccess(res, {
                    success: true,
                    ounces,
                    amount: numericAmount,
                    pricePerOunce: currentPrice
                })
            } catch (error) {
                console.error('Purchase processing error:', error)
                console.error('Request bod:', body)
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