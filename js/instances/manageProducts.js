


var sc = new Vue({

	el: '#manageProducts',

	data: {
		
		pageCounter : 41,
		userData : {},
		isOpenAddProductModal : false,
		product : { 
			id : { value : '', error : ''},
			name : { value : '', error : ''},
			product_type : { value : -1, error : ''},
			supplier : { value : -1, error : ''},
			unit : { value : -1, error : ''},
			description : { value : '', error : ''},
			current_price : { value : 0, error : ''},
		},
		productLib : [],
		supplierLib : [],
		unitLib : libUnits(),
		productTypeLib : productTypeLib(),
		mMessage : "",
		mMessageType : "",
		isForAdding : true


		
	},

	mounted(){

		this.fetchSuppliers();
		this.fetchProducts();
	},

	methods: {


		copyUserData(userData){

			this.userData = userData;

		},

		openUpdateProductModal(index){

			this.isOpenAddProductModal = true;
			this.isForAdding = false;

			console.log(this.productLib[index]);
			this.product.id.value = this.productLib[index].product_id;
			this.product.name.value = this.productLib[index].name;
			this.product.supplier.value = this.productLib[index].supplier_id
			this.product.unit.value = this.productLib[index].unit;
			this.product.product_type.value = this.productLib[index].product_type;
			this.product.current_price.value = this.productLib[index].current_price;

			
		},

		openAddProductModal(){

			this.isOpenAddProductModal = true;

		},

		closeAddProductModal(){

			this.isOpenAddProductModal = false;
			this.isForAdding = true;
			this.product.id.value = "";
			this.product.name.value = "";
			this.product.supplier.value = -1;
			this.product.unit.value = -1;
			this.product.product_type.value = "";
			this.product.current_price.value = 0;


			this.product.id.error = "";
			this.product.name.error = "";
			this.product.supplier.error = "";
			this.product.unit.error = "";
			this.product.product_type.error = "";
			this.product.current_price.error = "";

		},

		saveProduct(){

			let self = this;

			axios.post('../php/api/saveProduct.php',{
            
                product : this.product
                
            })
            .then(function (response){

                console.log(response.data);
                if(response.data.status == "SUCCESS"){
                    self.mMessage = "Successfully saved product details. Thank you!";
                    self.mMessageType = "has-text-success";
                } else {
                    self.savingModalMessage = "Error in saving. Please contact your system administrator.";
                    self.mMessageType = "has-text-danger";
                }

                self.closeAddProductModal();

            })
            .catch(function (error) {
                console.log(error);
            });

		},

		updateProduct(){

			let self = this;

			axios.post('../php/api/updateProduct.php',{
            
                product : this.product
                
            })
            .then(function (response){

                console.log(response.data);
                if(response.data.status == "SUCCESS"){
                    self.mMessage = "Successfully updated product details. Thank you!";
                    self.mMessageType = "has-text-success";
                } else {
                    self.savingModalMessage = "Error in saving. Please contact your system administrator.";
                    self.mMessageType = "has-text-danger";
                }

                self.closeAddProductModal();

            })
            .catch(function (error) {
                console.log(error);
            });

		},

		archiveProduct(id){

			let self = this;

			axios.post('../php/api/archiveProduct.php',{
            
                product_id : id
                
            })
            .then(function (response){

                console.log(response.data);
                if(response.data.status == "SUCCESS"){
                    self.mMessage = "Successfully deleted supplier. Thank you!";
                    self.mMessageType = "has-text-success";
                } else {
                    self.savingModalMessage = "Error in saving. Please contact your system administrator.";
                    self.mMessageType = "has-text-danger";
                }

                self.closeAddProductModal();

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

                console.log(response.data);
                if(response.data.status == "SUCCESS"){
                    self.productLib = response.data.message;                    
                }
            })
            .catch(function (error) {
                console.log(error);
            });

		},

		fetchSuppliers(){

			let self = this;
			axios.post('../php/api/fetchSuppliers.php',{
            })
            .then(function (response){

                console.log(response.data);
                if(response.data.status == "SUCCESS"){
                    self.supplierLib = response.data.message;                    
                }
            })
            .catch(function (error) {
                console.log(error);
            });

		},

		getUnit(unitId){
			let retVal = "PCS";

			if(unitId == 2) retVal = "PACK";
			else if(unitId == 3) retVal = "BOX";

			return retVal;
		},

		getProductType(value){
			let retVal = "DENTAL SUPPLIES";

			if(value == 2) retVal = "EQUIPMENTS";
			else if(value == 3) retVal = "CLEANING SUPPLIES";
			else if(value == 4) retVal = "OFFICE SUPPLIES";
			else if(value == 5) retVal = "OTHERS";

			return retVal;
		},


		closeMMessage(){
			this.mMessage = "";
			this.fetchProducts();
		}

	}

});




