Vue.component('reportsReceivedTable', {
    props: ['data', 'dateLabel', 'userData'],
    template: `
        
        <div class="w3-row" >
			<!-- {{totalQuantity}} -->
            <table class="table is-fullwidth is-hoverable is-striped w3-border w3-round ">
                <thead>
                    <tr class="has-background-info w3-center">
                        <th :colspan="colspanH" class="w3-center">{{dateLabel}}</i></th>
                    </tr>
                    <tr class="has-background-link">
                        <th :colspan="colspanH" class=" has-text-white ">List of Received Products &nbsp<i class="fas fa-boxes"></i></th>
                    </tr>
                    <tr class="has-background-dark">
                        <th class=" has-text-white ">#</th>
                        <th class=" has-text-white ">Date and Time Received</th>
                        <th class=" has-text-white ">Product Description</th>
                        <th class=" has-text-white ">Units</th>
                        <th class=" has-text-white ">Expiration</th>
                        <th class=" has-text-white ">Quantity</th>
                        <th class=" has-text-white ">Price</th>
                        <th class=" has-text-white ">Amount</th>
                    </tr>
                    <tr v-if="data.length > 0">
                        <th class="w3-right-align w3-border-right" colspan="7">Total:</th>
                        <th class="w3-left-align ">
                            ₱ {{convertMoney(totalAmount)}}
                        </th>
                    </tr>
                    <tr class="has-background-light w3-center" v-else="">
                        <th :colspan="colspanH" class="w3-center">No Results Found.</i> &nbsp <i class="fas fa-coffee"></i></th>
                    </tr>
                </thead>
                <tfoot v-if="data.length > 0">
                    <tr>
                        <th class="w3-right-align w3-border-right" colspan="7">Total:</th>
                        <th class="w3-left-align ">
                            ₱ {{convertMoney(totalAmount)}}
                        </th>
                    </tr>
                </tfoot>
                <tbody v-if="data.length > 0">
                    <tr v-for="d,index in data" >
                        <td >{{index+1}}</td>
                        <td >{{d.last_modified}}</td>
                        <td >{{d.name}}</td>
                        <td >{{d.unit}}</td>
                        <td >{{d.expiration_date}}</td>
                        <td >{{d.quantity}}</td>
                        <td >₱ {{convertMoney(Number(d.price))}}</td>
                        <td >₱ {{convertMoney(Number(d.quantity)*Number(d.price))}}</td>
                        
                    </tr>
                </tbody>
            </table>
        </div>

    `,

    methods : {

        convertMoney(n){
            return (Number(n)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

        },

        openViewModal(index){
            this.$emit('open-view-modal',index);
        },

        voidTransaction(id){
            
            this.$emit('void-transaction',id);
        }

    },

    computed: {

        totalAmount(){

            
            return this.data.reduce(function (accumulator, p) {

                return accumulator + (Number(p.price)*Number(p.quantity));

            }, 0);

        },

        totalQuantity(){

            
            return this.data.reduce(function (accumulator, p) {

                return accumulator + Number(p.quantity);

            }, 0);

        },
		
		

        colspanH(){
            
            return 8;

        }


    },


});