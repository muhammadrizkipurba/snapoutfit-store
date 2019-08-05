import React, { Component } from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";
// Paypal ID : AQFP_xIpZ-c4cq4NHpiCicagPNcQ-Fe133v1XWRzFd5E22AJtF1cujW9JFHFyyaDLrXi3T9STBpeBgUj


class Paypal extends Component {
    render() {
        
        const onSuccess = (payment) => {
            this.props.onSuccess(payment)
        // SUCCESS PAYMENT RESPONSE //
        //  { 
        //      paid: true, cancelled: false, payerID: "F8NGN8PSNT5J8", paymentID: "PAYID-LU6STHY07G58561XM854263L", paymentToken: "EC-4FM66607JN9825823", … }
        //      address: { recipient_name: "test buyer", line1: "1 Main St", city: "San Jose", state: "CA", postal_code: "95131", … }
        //      cancelled: false
        //      email: "muhammadrizkipurba7-buyer@gmail.com"
        //      paid: true
        //      payerID: "F8NGN8PSNT5J8"
        //      paymentID: "PAYID-LU6STHY07G58561XM854263L"
        //      paymentToken: "EC-4FM66607JN9825823"
        //      returnUrl: "https://www.paypal.com/checkoutnow/error?paymentId=PAYID-LU6STHY07G58561XM854263L&token=EC-4FM66607JN9825823&PayerID=F8NGN8PSNT5J8"
        //      __proto__: Object
        //  }
        }

        const onCancel = () => {
            this.props.onCancel()
        }

        const onError = () => {
            this.props.onError()
        }

        let env = 'sandbox';
        let currency = 'USD';
        let total = this.props.toPay;

        const client = {
            sandbox: 'AQFP_xIpZ-c4cq4NHpiCicagPNcQ-Fe133v1XWRzFd5E22AJtF1cujW9JFHFyyaDLrXi3T9STBpeBgUj',
            production: ''
        }

        return (
            <div>
                <PaypalExpressBtn 
                    env={env}
                    client={client}
                    currency={currency}
                    total={total}
                    onError={onError}
                    onSuccess={onSuccess}
                    onCancel={onCancel}
                    style={{
                        size: 'large',
                        shape: 'pill',
                        color: 'gold',
                        label: 'checkout'
                    }}

                />
            </div>
        )
    }
}

export default Paypal
