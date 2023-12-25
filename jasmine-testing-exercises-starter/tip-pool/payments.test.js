describe("Servers test (with setup and tear-down)", function() {
    beforeEach(function () {
        // initialization logic
        billAmtInput.value = 1000;
        tipAmtInput.value = 20;
    });

    it('add the current payment and update the table', function () { 
        submitPaymentInfo();

        let billrow = paymentTbody.querySelector('td')
        let tiprow = billrow.nextSibling;
        let per_row = tiprow.nextSibling; 

        expect(billrow.innerText).toEqual('$1000');
        expect(tiprow.innerText).toEqual('$20');
        expect(per_row.innerText).toEqual('2%');
        expect(billAmtInput.value).toEqual('');
        expect(tipAmtInput.value).toEqual('');



    });

    afterEach(function() {

    });
});