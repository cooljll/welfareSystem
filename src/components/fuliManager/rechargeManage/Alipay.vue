<template>
  <div>
    <form id="pay_form" name="pay_form" action="https://mapi.alipay.com/gateway.do?_input_charset=UTF-8" method="POST">
        <input type="hidden" name="_input_charset" value="UTF-8" />
        <input type="hidden" name="subject" value="A238C60707FF4A11865FCFF1DF7895F8" />
        <input type="hidden" name="sign" value="b04994512302d7521c8b4b0830aa775a" />
        <input type="hidden" name="it_b_pay" value="1h" />
        <input type="hidden" name="notify_url" value="http://hr.youmina.com/rest/notifies/backend" />
        <input type="hidden" name="payment_type" value="1" />
        <input type="hidden" name="out_trade_no" value="A238C60707FF4A11865FCFF1DF7895F8" />
        <input type="hidden" name="partner" value="2088421353558282" />
        <input type="hidden" name="service" value="create_direct_pay_by_user" />
        <input type="hidden" name="total_fee" value="1" />
        <input type="hidden" name="return_url" value="http://hr.youmina.com/rest/notifies/web/frontend" />
        <input type="hidden" name="sign_type" value="MD5" />
        <input type="hidden" name="seller_id" value="2088421353558282" />
        <input type="submit" value="去支付" style="display:none;" />
    </form>
    document.forms['pay_form'].submit()
  </div>
</template>
<script>
    export default{
        data(){
            return{
                
            }
        },
        mounted(){
            
            setTimeout(function(){
                this.$router.push("/OrderRecharge")
            },3000)
        }
    }
</script>