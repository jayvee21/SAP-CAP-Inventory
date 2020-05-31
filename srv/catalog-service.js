const cds = require('@sap/cds')

module.exports = cds.service.impl( srv => {
    const  {orderItems} = srv.entities("inventory.db")

    srv.before('CREATE', 'Orders', (req) => {
        var payload = req.data
        console.log(payload)
    })

})