Vue.component('reportsReleasedTable', {
    props: ['data', 'dateLabel', 'userData'],
    template: `
        
        <div class="w3-row" >
            <table class="table is-fullwidth is-hoverable is-striped w3-border w3-round ">
                <thead>
                    <tr class="has-background-info w3-center">
                        <th :colspan="colspanH" class="w3-center">{{dateLabel}}</i></th>
                    </tr>
                    <tr class="has-background-link">
                        <th :colspan="colspanH" class=" has-text-white ">Incoming Transactions &nbsp<i class="fas fa-boxes"></i></th>
                    </tr>
                    <tr class="has-background-dark">
                        <th class=" has-text-white ">#</th>
                        <th class=" has-text-white ">Date and Time Received</th>
                        <th class=" has-text-white ">Branch</th>
                        <th class=" has-text-white ">Description</th>
                        <th class=" has-text-white ">Units</th>
                        <th class=" has-text-white ">Quantity</th>
                        <th class=" has-text-white ">Price</th>
                        <th class=" has-text-white ">Amount</th>
                    </tr>
                    <tr v-if="data.length > 0">
                        <th class="w3-right-align w3-border-right" colspan="7">Total:</th>
                        <th class="w3-left-align " >
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
                        <th class="w3-left-align " >
                            ₱ {{convertMoney(totalAmount)}}
                        </th>
                    </tr>
                </tfoot>
                <tbody v-if="data.length > 0">
                    <tr v-for="d,index in data" >
                        <td >{{index+1}}</td>
                        <td >{{d.last_modified}}</td>
                        <td >{{d.branch}}</td>
                        <td >{{d.name}}</td>
                        <td >{{d.unit}}</td>
                        <td >{{d.quantity}}</td>
                        <td >₱ {{convertMoney(Number(d.product_price))}}</td>
                        <td >₱ {{convertMoney(Number(d.amount))}}</td>
                        
                    </tr>
                </tbody>
            </table>
        </div>

    `,

    methods : {

        convertMoney(n){
            let retVal = String(n).replace(/(.)(?=(\d{3})+$)/g,'$1,') + ".00";
            if(String(n).indexOf('.') !== -1) retVal = String(n).replace(/(.)(?=(\d{3})+$)/g,'$1,');

            return retVal;

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

                return accumulator + (Number(p.amount));

            }, 0);

        },

        colspanH(){
            
            return 8;

        }


    },


});