Vue.component('reportsExpiredTable', {
    props: ['data', 'dateLabel', 'userData', 'dateToday'],
    template: `
        
        <div class="w3-row" >
            <table class="table is-fullwidth is-hoverable is-striped w3-border w3-round ">
                <thead>
                    <tr class="has-background-link">
                        <th :colspan="colspanH" class=" has-text-white ">List of Products with Expiration &nbsp<i class="fas fa-boxes"></i></th>
                    </tr>
                    <tr class="has-background-dark">
                        <th class=" has-text-white ">#</th>
                        <th class=" has-text-white ">Date and Time Received</th>
                        <th class=" has-text-white ">Product Description</th>
                        <th class=" has-text-white ">Units</th>
                        <th class=" has-text-white ">Quantity</th>
                        <th class=" has-text-white ">Price</th>
                        <th class=" has-text-white ">Amount</th>
                        <th class=" has-text-white pointer" @click="clickSort(1)">
                            Expiration &nbsp
                            <span :class="{'has-text-primary' : sortedBy == 1 || sortedBy == 11}" ><i class="fas fa-sort"></i></span>
                           
                        </th>
                        <th class=" has-text-white w3-border-left w3-center">Consumed?</th>
                    </tr>
                    <tr v-if="data.length > 0">
                        <th class="w3-right-align w3-border-right" colspan="6">Total:</th>
                        <th class="w3-left-align ">
                            ₱ {{convertMoney(totalAmount)}}
                        </th>
                        <th class="w3-left-align w3-border-left">
                        </th>

                        <th class="w3-left-align w3-border-left">
                        </th>
                    </tr>
                    <tr class="has-background-light w3-center" v-else="">
                        <th :colspan="colspanH" class="w3-center">No Results Found.</i> &nbsp <i class="fas fa-coffee"></i></th>
                    </tr>
                </thead>
                <tfoot v-if="data.length > 0">
                    <tr>
                        <th class="w3-right-align w3-border-right" colspan="6">Total:</th>
                        <th class="w3-left-align ">
                            ₱ {{convertMoney(totalAmount)}}
                        </th>
                        <th class="w3-left-align w3-border-left">
                        </th>
                        <th class="w3-left-align w3-border-left">
                        </th>
                    </tr>
                </tfoot>
                <tbody v-if="data.length > 0">
                    <tr v-for="d,index in data" >
                        <td >{{index+1}}</td>
                        <td >{{d.last_modified}}</td>
                        <td >{{d.name}}</td>
                        <td >{{d.unit}}</td>
                        
                        <td >{{d.quantity}}</td>
                        <td >₱ {{convertMoney(Number(d.price))}}</td>
                        <td >₱ {{convertMoney(Number(d.quantity)*Number(d.price))}}</td>
                        <td class="w3-border-left">{{d.expiration_date}}</td>
                        <td class="w3-border-left w3-center pointer" @click="updateConsumed(d.is_consumed, index, d.received_id)"><b>
                            <span class="has-text-danger" v-if="d.is_consumed != 'Y' && checkIfExpired(d.expiration_date) ">E</span>
                            <span class="has-text-warning" v-else-if="d.is_consumed != 'Y'">N</span>
                            <span class="has-text-success" v-else=""><i class="fas fa-check"></i></span>
                            </b>
                        </td>
                        
                    </tr>
                </tbody>
            </table>
        </div>

    `,

    methods : {

        clickSort(value){

            this.$emit("click-sort",value);

        },

        convertMoney(n){
            let retVal = String(n).replace(/(.)(?=(\d{3})+$)/g,'$1,') + ".00";
            if(String(n).indexOf('.') !== -1) retVal = String(n).replace(/(.)(?=(\d{3})+$)/g,'$1,');

            return retVal;

        },

        updateConsumed(consumedCtr, index, receivedId){

            if(!this.checkIfExpired(this.data[index].expiration_date)) {
                let self = this;
                axios.post('../php/api/updateProductConsumed.php',{
                    consumed_ctr : consumedCtr,
                    received_id : receivedId
                })
                .then(function (response){

                    console.log(response.data);
                    if(response.data.status == "SUCCESS"){

                        self.$emit('update-product-received');
                        //self.expiredProducts = response.data.message;                    
                    }

                })
                .catch(function (error) {
                    console.log(error);
                });
            }

        },

        checkIfExpired(expirationDate){


            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            var eyyyy = expirationDate.substring(0,4);
            var emm = expirationDate.substring(5,7);
            var edd = expirationDate.substring(8,10);

            return Number(eyyyy + emm + edd + "") < Number(yyyy + mm + dd + "");

        }

    },

    computed: {

        totalAmount(){

            
            return this.data.reduce(function (accumulator, p) {

                return accumulator + (Number(p.price)*Number(p.quantity));

            }, 0);

        },

        colspanH(){
            
            return 9;

        }


    }


});