const cds = require('@sap/cds')
module.exports = cds.service.impl( srv => {

    const { OrderItems } = srv.entities('inventory.db')

    srv.after( ['READ', 'EDIT'], 'Orders', _calculateTotals )
    
    async function _calculateTotals (orders, req){

        const ordersByID = Array.isArray(orders, req) 
            ? 
                orders.reduce( function(all, obj){
                    ( all[obj.ID] = obj ).total = 0;
                    return all;
                }, {}) 

            : { [orders.ID] : orders }
        
        return cds.transaction(req).run(
            SELECT  .from(OrderItems)
                    .columns('parent_ID', 'netAmount')
                    .where( {parent_ID: { in: Object.keys(ordersByID) }} )
        ).then ( items => 
            items.forEach( orderItem => ordersByID[orderItem.parent_ID].total += orderItem.netAmount)
        )
    }


    srv.before( ['CREATE'], 'Orders', ( req )=>{
        var payload = req.data
        
        // Init transaction
        const txn = cds.transaction(req)
        var orders = req.data
        if( orders.items ){
            orders.items.map( item => item.netAmount = item.qty * item.amount )
        }

    })

})