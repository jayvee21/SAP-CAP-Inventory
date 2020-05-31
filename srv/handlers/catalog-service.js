const cds = require('@sap/cds')

module.exports = cds.service.impl( srv => {
    const  {orderItems} = srv.entities("inventory.db")

    srv.before('CREATE', 'Orders', (req) => {
        var payload = req.data
        console.log(payload)
    })


    // Name the parameter to each for each row handler
    srv.after('READ','Products', each =>{
        console.log("---->", each)
        if ( each.price <= 99  ) each.title += ' --10% discount'
    })

})