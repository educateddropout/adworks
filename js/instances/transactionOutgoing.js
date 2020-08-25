


var sc = new Vue({

	el: '#transactionOutgoing',

	data: {
		
		pageCounter : 32,
		tabCounter : 32,
		userData : {},
		isOpenAddModal : false,
		product : {
			index : { 'value' : -1, 'error' : '' },
			quantity : { 'value' : 0, 'error' : '' },
			unit : { 'value' : '', 'error' : '' },
			stocks : { 'value' : '', 'error' : ''},
			product_price : { 'value' : 0, 'error' : ''},
			amount : { 'value' : 0, 'error' : ''},
		},
		branch : { value : -1, error : ''},
		transaction : { 
			products : []
		},
		productLib : [],
		branchLib : branchLib(),
		outgoingTransactions : [],
		mMessage : "",
		mMessageType : "",
		isForAdding : true,

		selectedTransaction : -1,

		isActiveProductModal : false,

		dateLabel : "", // required on all reports
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
			this.product.quantity.error = validateQuantityOutgoing(this.product.quantity.value, this.product.stocks.value, true);
			//this.product.branch.error = validateIndex(this.product.branch.value);

			if(this.product.index.error == "" && this.product.quantity.error == ""){

				this.transaction.products.push({
					name : self.productLib[self.product.index.value].name,
					id : self.productLib[self.product.index.value].product_id,
					quantity : self.product.quantity.value,
					unit : self.product.unit.value,
					stocks : self.product.stocks.value,
					product_price : self.productLib[self.product.index.value].current_price,
					amount : self.product.amount.value,
				});

				// stocks left
				this.productLib[this.product.index.value].quantity = this.productLib[this.product.index.value].quantity - this.product.quantity.value;

				this.product.quantity.value = 0;
				this.product.index.value = -1;
				this.product.unit.value = "";
				this.product.product_price.value = 0;
				this.product.amount.value = 0;
				this.product.stocks.value = 0;

				this.$refs.productSelect.focus();

			}


		},

		voidTransaction(id){

			let self = this;

			self.mMessage = "Voiding transaction. Please wait!";

			axios.post('../php/api/voidTransaction.php',{
            
                transaction_id : id,
                transaction_type : "O"

                
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

		updatePrice(){

			this.product.amount.value = this.product.quantity.value * this.productLib[this.product.index.value].current_price;
			this.product.quantity.error = validateQuantityOutgoing(this.product.quantity.value, this.product.stocks.value, false);

		},

		deleteProduct(index){

			this.transaction.products.splice(index,1);

		},

		selectProduct(){

			this.product.quantity.value = 0;
			this.product.stocks.value = this.productLib[this.product.index.value].quantity;
			this.product.unit.value = this.getUnit(this.productLib[this.product.index.value].unit);

			this.product.quantity.error = validateQuantityOutgoing(this.product.quantity.value, this.product.stocks.value, false);
			


		},

		openAddModal(){

			this.isOpenAddModal = true;
			this.isForAdding = true;

		},

		openViewModal(index){

			this.selectedTransaction = index;
			this.isOpenAddModal = true;
			this.isForAdding = false;
			this.fetchOutgoingTransactionProducts(index);

		},

		closeModal(){

			this.isOpenAddModal = false;
			this.transaction.products = [];
			this.fetchProducts();

		},

		saveOutgoingTransaction(){

			let self = this;

			axios.post('../php/api/saveOutgoingTransactions.php',{
            
                products : this.transaction.products,
                branch : this.branch.value

                
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

		fetchOutgoingTransactions(date_from, date_to){
			
			this.dateFrom = date_from;
			this.dateTo = date_to;
			let self = this;

			axios.post('../php/api/fetchOutgoingTransactions.php',{
				date_from: date_from,
				date_to : date_to
            })
            .then(function (response){

                console.log(response.data);
                if(response.data.status == "SUCCESS"){

                    self.outgoingTransactions = response.data.message;                    
                }

            })
            .catch(function (error) {
                console.log(error);
            });

		},

		fetchOutgoingTransactionProducts(index){

			let self = this;
			axios.post('../php/api/fetchOutgoingTransactionProducts.php',{
				transactionId : this.outgoingTransactions[index].transaction_id,
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
			this.mMessage = "";
			this.fetchOutgoingTransactions(this.dateFrom, this.dateTo);
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

        printOnModal(){

        	this.printReceipt(this.selectedTransaction);
        },

        printReceipt(index){

            var self = this;
            
            axios.post('../php/api/printReleaseReceipt.php', {
                transaction_id : this.outgoingTransactions[index].transaction_id,
            })
            .then(function (response){

                console.log(response.data);
                //self.getListOfPayments();
                window.open('../php/pdf/releaseReceipt.pdf','_newtab');

            })
            .catch(function (error) {
                alert(error);
            });

        },

        viewProductDetails(){

        	this.isActiveProductModal = true;

        },

        closeProductDetails(){

        	this.isActiveProductModal = false;

        }

	}

});




