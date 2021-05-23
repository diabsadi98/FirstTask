describe('API testing' , () => {

    it.skip('BIT only' , () => {
        cy.request('https://api.nomics.com/v1/currencies/ticker?key=a1cb5c658f5871864a9c1f4e48262066374a2c66&ids=BTC&per-page=10').then((resp) => {
            expect('Bitcoin').to.equal(resp.body[0].name) })
})

    it.skip('BIT AND ETH' , () => {
        cy.request('https://api.nomics.com/v1/currencies/ticker?key=a1cb5c658f5871864a9c1f4e48262066374a2c66&ids=BTC,ETH&per-page=10').then((resp) => {
        //First way
        // expect('Bitcoin').to.equal(resp.body[0].name);
        // expect('Ethereum').to.equal(resp.body[1].name);
        
        //Second way
        //    let checkingNames = ['Bitcoin' , 'Ethereum'];
        //    let count = 0 ;
        //    for(let [key , value] of Object.entries(resp.body))         
        //         expect(checkingNames[count++]).to.equal(resp.body[key].name);
                
        //Third way
        let checkingNames = ['Bitcoin' , 'Ethereum'];
        for(let i=0 ; i < resp.body.length; i++)
            expect(checkingNames[i]).to.equal(resp.body[i].name)
        console.log(resp.status);
        })
        
    })

    it.skip('Requesting withoud key' , ()=> {
        cy.request({url: 'https://api.nomics.com/v1/currencies/ticker?ids=BTC,ETH&per-page=10', failOnStatusCode: false}).then((resp)=>{
            console.log(resp.status);
        })

    })

it('JSON iterable' , () => {

    cy.request('https://api.nomics.com/v1/currencies/ticker?key=a1cb5c658f5871864a9c1f4e48262066374a2c66&ids=&per-page=10').then((resp) => {
        Object.keys(resp.body).forEach((key)=>{
            //if(resp.body[key]=='name')
                console.log(resp.body[key].name);
    
                })
         })
    })

})