Vue.component('incomingTransactionTable', {
    props: ['transactions', 'dateLabel', 'userData'],
    template: `
        
        <div class="w3-row" v-if="transactions.length > 0">
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
                        <th class=" has-text-white ">Date and Time of Transaction</th>
                        <th class=" has-text-white ">Received and Paid By</th>
                        <th class=" has-text-white ">Transaction Amount</th>
                        <th class=" has-text-white w3-border-left" >&nbsp</th>
                    </tr>
                    <tr>
                        <th class="w3-right-align w3-border-right" colspan="3">Total:</th>
                        <th class="w3-left-align " colspan = "2">
                            ₱ {{convertMoney(totalTransactionAmount)}}
                        </th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th class="w3-right-align w3-border-right" colspan="3">Total:</th>
                        <th class="w3-left-align " colspan = "2">
                            ₱ {{convertMoney(totalTransactionAmount)}}
                        </th>
                    </tr>
                </tfoot>
                <tbody>
                    <tr v-for="it,index in transactions" >
                        <td @click="openViewModal(index)">{{index+1}}</td>
                        <td @click="openViewModal(index)">{{it.last_modified}}</td>
                        <td @click="openViewModal(index)">{{it.name}}</td>
                        <td @click="openViewModal(index)">₱ {{convertMoney(Number(it.total_amount))}}</td>
                        <td class="has-text-danger w3-border-left w3-center pointer" @click="showVoidTransactionModal(it.transaction_id)">
                            <i class="fas fa-trash-alt"></i>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Error message -->
            <div class="modal" :class="{'is-active' : isShowVoidTransaction }">
                <div class="modal-background"></div>
                <div class="modal-card">

                    <section class="modal-card-body">
                        <div class="w3-row">
                            <br>
                            <p class="w3-center has-text-danger">{{authenticationError}}</p>
                        </div>
                        <div class="field" v-show="userData.userType != 3">
                            <br>
                            <div class="control">
                                <label><b>Please provide SA account</b></label>
                                <input class="input" type="text" placeholder="username" v-model="username" autocomplete="username"  />
                                <p class="help has-text-danger">{{usernameError}}</p>
                            </div>
                        </div>
                        
                        <div class="field">
                            <div class="control">
                                <label><b>Password</b></label>
                                <input class="input" type="password" placeholder="**********" v-model="password" @keyup.enter="submitAuthentication" autocomplete="current-password" />
                                <p class="help has-text-danger">{{passwordError}}</p>
                            </div>
                        </div>
                    </section>

                    <footer class="modal-card-foot">
                        <button class="button is-success" @click="submitAuthentication" >Continue</button>
                        <button class="button" @click="closeVoidTransactionModal">Cancel</button>
                    </footer>

                </div>
            </div>

        </div>

    `,

    data(){

        return {

            isShowVoidTransaction : false,
            selectedId : "",
            username : "",
            usernameError : "",
            password : "",
            passwordError : "",
            authenticationError : ""

        }

    },

    methods : {

        convertMoney(n){

            let retVal = String(n).replace(/(.)(?=(\d{3})+$)/g,'$1,') + ".00";
            if(String(n).indexOf('.') !== -1) retVal = String(n).replace(/(.)(?=(\d{3})+$)/g,'$1,');

            return retVal;

        },

        openViewModal(index){
            this.$emit('open-view-modal',index);
        },

        showVoidTransactionModal(id){

            this.selectedId = id;
            this.isShowVoidTransaction = true;

        },

        closeVoidTransactionModal(){

            this.isShowVoidTransaction = false;

        },

        voidTransaction(id){
            
            this.closeVoidTransactionModal()
            this.$emit('void-transaction',id);

        },


        submitAuthentication(id){
            
            let self = this;

            this.passwordError = validateLoginInput(this.password);
            if(this.userData.userType != 3) this.usernameError = validateLoginInput(this.username);
            else{
                this.username = this.userData.userName;
            }

            if(this.usernameError == '' && this.passwordError   == ''){

                axios.post('../php/api/authenticateForDeletion.php', {
                    username: this.username,
                    password: this.password
                })
                .then(function (response){

                    console.log(response.data);
                    if(response.data.status == "SUCCESS"){

                        self.voidTransaction(self.selectedId);
                        self.username = "";
                    self.usernameError = "";
                    self.password = "";
                    self.passwordError = "";
                    self.authenticationError = "";
                        
                    }
                    else{
                        self.authenticationError = response.data.message;
                    }

                    

                })
                .catch(function (error) {
                    console.log(error);
                });
            }

        }

    },

    computed: {

        totalAmount(){

            
            return this.transactions.reduce(function (accumulator, p) {

                return accumulator + Number(p.total_amount);

            }, 0);

        },
        

        totalTransactionAmount(){

            
            return this.transactions.reduce(function (accumulator, p) {

                return accumulator + Number(p.total_amount);

            }, 0);


        },

        colspanH(){
            
            return 5;

        }


    },


});

