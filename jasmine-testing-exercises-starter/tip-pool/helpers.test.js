describe("Servers test (with setup and tear-down)", function() {
    beforeEach(function () {
        // initialization logic
        billAmtInput.value = 1000;
        tipAmtInput.value = 20;
        submitPaymentInfo();
    });

    it('should return the amount of tagged payment', function() {
        expect(sumPaymentTotal('tipAmt')).toEqual(20);
        expect(sumPaymentTotal('billAmt')).toEqual(1000);
    });

    it('should calculate the % of tip', function() {
        expect(calculateTipPercent(1000, 20)).toEqual(2);
        expect(calculateTipPercent(500, 10)).toEqual(2);
    });

    it('should append value to the row', function() {
        let row = document.createElement('tr');
        appendTd(row, 'Jamie');
        expect(row.innerText).toEqual('Jamie')

        appendTd(row, 50);
        expect(row.innerText).toEqual('Jamie50')
    });

    afterEach(function() {
        billAmtInput.value = null;
        tipAmtInput.value = null;
        allPayments = {};
        paymentId = 0;

        paymentTbody.innerHTML = '';
        summaryTds[0].innerHTML = '';
        summaryTds[1].innerHTML = '';
        summaryTds[2].innerHTML = '';
      });
});