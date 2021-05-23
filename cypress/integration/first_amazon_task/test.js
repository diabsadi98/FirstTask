const { hasUncaughtExceptionCaptureCallback } = require("process");

describe('Amazon Test Seacrh',() => {
    
    it('Open the website',() => {
        cy.visit('https://www.amazon.com/?&tag=googleglobalp-20&ref=pd_sl_7nnedyywlk_e&adgrpid=82342659060&hvpone=&hvptwo=&hvadid=393493755082&hvpos=&hvnetw=g&hvrand=4690605849944238361&hvqmt=e&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9069818&hvtargid=kwd-10573980&hydadcr=2246_11061421&gclid=EAIaIQobChMImuPdi7zQ8AIVBud3Ch03qACCEAAYASAAEgJNPfD_BwE')
    })

    it('Check if the input typed',() => {
        cy.get('#twotabsearchtextbox').type('Clock').should('have.value','Clock');
        
    })

    it('Check if the search button work',() => {
        cy.get('#nav-search-submit-button').click();
    })

    it('Select the clock',() => {
        cy.get('h2>a.a-link-normal',{timeout:10000}).contains('Clock').click()
       cy.go(-1)
    })
    
    it.skip('Add the clock to cart', () =>{
        cy.get('#productTitle').invoke('text').then((text) => {
            cy.writeFile('messages/message.txt', text.trim())
        })
        cy.get('#add-to-cart-button').click()
        cy.get('#nav-cart').click();
        cy.get('.a-link-normal>.a-size-medium',{timeout:10000}).first().invoke('text').then((text)=>{
            cy.readFile('messages/message.txt').then((message) => {
                expect(text.trim()).to.equal(message);
            })
        })
            
    })

    it.skip('Check if the item selected is the same' , () => {
        
    })

    it('Select the first clock' , () => {
        cy.get('h2>a.a-link-normal>span.a-size-base-plus',{timeout:10000}).eq(1).should('contain' , 'Clock').click().go('back')
    
    })
    
    it('Select the last clock' , () => {
        cy.get('h2>a.a-link-normal>span.a-size-base-plus',{timeout:10000}).eq(-1).should('contain' , 'Clock').click()
        
    })
    
    it('Blur nav bar search',() => {
        cy.get('#twotabsearchtextbox').focus().blur({force  : true})
    })
    
    it.skip('Check the checkbox and clear the input field',()=>{
        cy.get('#gift-wrap').check()    
        cy.get('#twotabsearchtextbox').clear();
    })
    
    it('Screenshot test' , () => {
        cy.screenshot()
     })

    it('Check if writes correct' , () => {
        cy.writeFile('messages/message.txt', 'Hello World')
        cy.readFile('messages/message.txt').then((text) => {
          expect(text).to.equal('Hello World') 
        })
     })

     it("Intercept Amazon call" , () => {
        cy.intercept('https://www.amazon.com/').as('amazonFirstRequest');
        cy.visit('https://www.amazon.com/');
        cy.get('@amazonFirstRequest').then((res)=>{
            //expect(response.response.equal.statusCode).to.equal('200')
            expect(res.response['statusCode']).to.equal(200)
        })
        

     })

     it('Check host' , ()=> {
        cy.visit('https://www.amazon.com/');
        cy.window().then((win) => {
            expect(win.location.hostname).to.equal('www.amazon.com')
        })
     })

})