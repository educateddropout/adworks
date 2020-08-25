


var sc = new Vue({

	el: '#transactionIncoming',

	data: {
		
		pageCounter : 31,
		tabCounter : 31,
		userData : {},
		isOpenAddModal : false,
		product : {
			index : { 'value' : -1, 'error' : '' },
			quantity : { 'value' : 0, 'error' : '' },
			price : { 'value' : 0, 'error' : '' },
			unit : { 'value' : '', 'error' : '' },
			expirationDate : {'value' : '', 'error' : ''}
		},
		transaction : { 
			products : []
		},
		productLib : [],
		incomingTransactions : [],
		mMessage : "",
		mMessageType : "",
		isForAdding : true,

		selectedTransaction : -1,

		isActiveProductModal : false,

		dateLabel : "",
		dateTo : "",
		dateFrom : ""
		
	},

	mounted(){

		this.fetchProducts();
	},

	computed: {

		totalAmount(){

            
            return this.transaction.products.reduce(function (accumulator, p) {

                return accumulator + Number(p.amount);

            }, 0);

        },

	},

	methods: {


		copyUserData(userData){

			this.userData = userData;

		},

		configDateLabel(dateLabel){

			this.dateLabel = dateLabel;
		},

		addProduct(){


			self = this;
			this.product.index.error = validateIndex(this.product.index.value);
			this.product.quantity.error = validateQuantity(this.product.quantity.value);
			this.product.price.error = validatePrice(this.product.price.value);
			this.product.expirationDate.error = validateExpirationDate(this.product.expirationDate.value);

			if(this.product.index.error == "" && this.product.quantity.error == "" &&  this.product.price.error == ""){
				this.transaction.products.push({
					name : self.productLib[self.product.index.value].name,
					id : self.productLib[self.product.index.value].product_id,
					product_price : self.product.price.value,
					quantity : self.product.quantity.value,
					unit : self.product.unit.value,
					amount : (self.product.price.value*self.product.quantity.value),
					expirationDate : self.product.expirationDate.value
				});

				this.product.quantity.value = 0;
				this.product.index.value = -1;
				this.product.price.value = 0;
				this.product.unit.value = "";

				this.$refs.productSelect.focus();

			}


		},


		deleteProduct(index){

			this.transaction.products.splice(index,1);

		},

		selectProduct(){

			this.product.price.value = this.productLib[this.product.index.value].current_price;
			this.product.unit.value = this.getUnit(this.productLib[this.product.index.value].unit);


		},


		openAddModal(){

			this.isOpenAddModal = true;
			this.isForAdding = true;

		},

		openViewModal(index){

			this.isOpenAddModal = true;
			this.isForAdding = false;
			this.fetchIncomingTransactionProducts(index);

		},

		closeModal(){

			this.isOpenAddModal = false;
			this.transaction.products = [];

		},

		saveIncomingTransaction(){

			let self = this;

			self.mMessage = "Saving transaction. Please wait!";

			axios.post('../php/api/saveIncomingTransactions.php',{
            
                products : this.transaction.products,
                total_amount : this.totalAmount

                
            })
            .then(function (response){

                console.log(response.data);
                if(response.data.status == "SUCCESS"){
                    self.mMessage = "Successfully saved incoming transaction details. Thank you!";
                    self.mMessageType = "has-text-success";
                    

                } else {

                    self.savingModalMessage = "Error in saving. Please contact your system administrator.";
                    self.mMessageType = "has-text-danger";

                }

                self.closeModal();
                self.closeProductDetails();
                self.fetchProducts();
                

            })
            .catch(function (error) {
                console.log(error);
            });

		},

		voidTransaction(id){

			let self = this;

			self.mMessage = "Voiding transaction. Please wait!";

			axios.post('../php/api/voidTransaction.php',{
            
                transaction_id : id,
                transaction_type : "I"

                
            })
            .then(function (response){

                console.log(response.data);
                if(response.data.status == "SUCCESS"){
                    self.mMessage = "Successfully voided transaction. Thank you!";
                    self.mMessageType = "has-text-success";

                } else {

                    self.savingModalMessage = "Error in saving. Please contact your system administrator.";
                    self.mMessageType = "has-text-danger";

                }

            })
            .catch(function (error) {
                console.log(error);
            });

		},

		fetchProducts(){

			let self = this;
			axios.post('../php/api/fetchProducts.php',{
            })
            .then(function (response){

                if(response.data.status == "SUCCESS"){
                    self.productLib = response.data.message;                    
                }

            })
            .catch(function (error) {
                console.log(error);
            });

		},

		fetchIncomingTransactions(date_from, date_to){

			this.dateFrom = date_from;
			this.dateTo = date_to;

			let self = this;
			axios.post('../php/api/fetchIncomingTransactions.php',{

				date_from: date_from,
				date_to : date_to
				
            })
            .then(function (response){

                console.log(response.data);
                if(response.data.status == "SUCCESS"){

                    self.incomingTransactions = response.data.message;                    
                }

            })
            .catch(function (error) {
                console.log(error);
            });

		},

		fetchIncomingTransactionProducts(index){

			let self = this;
			axios.post('../php/api/fetchIncomingTransactionProducts.php',{
				transactionId : this.incomingTransactions[index].transaction_id,
            })
            .then(function (response){

                console.log(response.data);
                if(response.data.status == "SUCCESS"){

                    self.transaction.products = response.data.message;                    
                }

            })
            .catch(function (error) {
                console.log(error);
            });

		},

		closeMMessage(){
			if(!(this.mMessage == "Saving transaction. Please wait!" || this.mMessage == "Voiding transaction. Please wait!")){
				this.mMessage = "";
				this.fetchIncomingTransactions(this.dateFrom, this.dateTo);
			}
		},

		getUnit(unitId){
			let retVal = "PCS";

			if(unitId == 2) retVal = "PACK";
			else if(unitId == 3) retVal = "BOX";

			return retVal;
		},

		convertMoney(n){

            let retVal = String(n).replace(/(.)(?=(\d{3})+$)/g,'$1,') + ".00";
            if(String(n).indexOf('.') !== -1) retVal = String(n).replace(/(.)(?=(\d{3})+$)/g,'$1,');

            return retVal;

        },

        viewProductDetails(){

        	this.isActiveProductModal = true;

        },

        closeProductDetails(){

        	this.isActiveProductModal = false;

        }


	}

});




