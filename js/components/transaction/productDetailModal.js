Vue.component('productDetailModal', {
	props: ['products', 'isActive', 'notForSaving'],
	template: `
		
		<div class="modal" :class="{'is-active':isActive}">
            <div class="modal-background"></div>
            <div class="modal-card">

                <section class="modal-card-body">
                    <br>
                    <br>
                    <div v-show="!notForSaving">
                        <h3 class="w3-center">
                            <b>Please review all the products before saving.</b>
                        </h3>
                        <p class="has-text-danger w3-center">
                            You cannot update the transaction once it was saved.
                        </p>

                        <div class="is-divider"></div>
                    </div>

                    <div class="w3-row w3-container">
                        <table class="table is-fullwidth is-hoverable is-striped w3-border w3-round ">
                            <thead>
                                <tr class="has-background-dark">
                                    <th class=" has-text-white ">#</th>
                                    <th class=" has-text-white ">Description</th>
                                    <th class=" has-text-white ">Unit</th>
                                    <th class=" has-text-white ">Quantity</th>
                                    <th class=" has-text-white ">Product Price</th>
                                    <th class=" has-text-white ">Amount</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr class="has-background-light">
                                    <th class="w3-border-right w3-right-align w3-border-right" colspan="5" >TOTAL</th>
                                    <th class="w3-border-right" >&#8369;{{convertMoney(totalAmount)}}</th>
                                </tr>
                            </tfoot>
                            <tbody>
                                <tr v-for="prod,index in products">
                                    <td class="w3-border-right">{{index+1}}</td>
                                    <td class="w3-border-right">{{prod.name}}</td>
                                    <td class="w3-border-right">{{prod.unit}}</td>
                                    <td class="w3-border-right">{{prod.quantity}}</td>
                                    <td class="w3-border-right">&#8369;{{convertMoney(prod.product_price)}}</td>
                                    <td class="w3-border-right">&#8369;{{convertMoney(prod.amount)}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </section>

                <footer class="modal-card-foot">
                    <button class="button is-success" @click="saveTransaction" v-show="!notForSaving">Continue</button>
                    <button class="button" @click="close">Cancel</button>
                </footer>

            </div>
        </div>

	`,

    computed: {

        totalAmount(){

            
            return this.products.reduce(function (accumulator, p) {

                return accumulator + Number(p.amount);

            }, 0);

        },

    },

    methods : {

        convertMoney(n){

            let retVal = String(n).replace(/(.)(?=(\d{3})+$)/g,'$1,') + ".00";
            if(String(n).indexOf('.') !== -1) retVal = String(n).replace(/(.)(?=(\d{3})+$)/g,'$1,');

            return retVal;

        },

        saveTransaction(){

            this.$emit('save-transaction');

        },

        close(){
            this.$emit('close');
        }

    }


});