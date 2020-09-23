


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
		unitLib : [],
		productTypeLib : [],
		mMessage : "",
		mMessageType : "",
		isForAdding : true


		
	},

	mounted(){

		this.fetchSuppliers();
		this.fetchProducts();
		this.fetchProductType();
		this.fetchUnits();

	},

	methods: {


		copyUserData(userData){

			this.userData = userData;

		},

		fetchProductType(){

			let self = this;
			axios.post('../php/api/fetchProductType.php',{
            })
            .then(function (response){

                console.log(response.data);
                if(response.data.status == "SUCCESS"){
                    self.productTypeLib = response.data.message;                    
                }
            })
            .catch(function (error) {
                console.log(error);
            });

		},

		fetchUnits(){

			let self = this;
			axios.post('../php/api/fetchUnits.php',{
            })
            .then(function (response){

                console.log(response.data);
                if(response.data.status == "SUCCESS"){
                    self.unitLib = response.data.message;                    
                }
            })
            .catch(function (error) {
                console.log(error);
            });

		},

		openUpdateProductModal(index){

			this.isOpenAddProductModal = true;
			this.isForAdding = false;

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
			this.product.description.value = "";
			this.product.supplier.value = -1;
			this.product.unit.value = -1;
			this.product.product_type.value = "";
			this.product.current_price.value = 0;


			this.product.id.error = "";
			this.product.name.error = "";
			this.product.description.error = "";
			this.product.supplier.error = "";
			this.product.unit.error = "";
			this.product.product_type.error = "";
			this.product.current_price.error = "";

		},

		saveProduct(){

			let self = this;
			this.validateProductType();
			this.validateProductName();
			//this.validateProductDescription();
			this.validateSupplier();
			this.validateUnit();
			this.validatePrice();
			
			if(this.product.product_type.error == '' && this.product.name.error == '' &&
				this.product.supplier.error == '' && this.product.unit.error == '' && this.product.current_price.error == ''){

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

	        }

		},

		validateProductType(){

			this.product.product_type.error = validateSelection(this.product.product_type.value);

		},

		validateProductName(){

			this.product.name.error = validateName(this.product.name.value, true);

		},

		validateProductDescription(){

			this.product.description.error = validateName(this.product.description.value, false);

		},

		validateSupplier(){

			this.product.supplier.error = validateSelection(this.product.supplier.value);

		},

		validateUnit(){

			this.product.unit.error = validateSelection(this.product.unit.value);

		},

		validatePrice(){

			this.product.current_price.error = validatePrice(this.product.current_price.value);

		},


		updateProduct(){

			let self = this;

			this.validateProductType();
			this.validateProductName();
			this.validateProductDescription();
			this.validateSupplier();
			this.validateUnit();
			this.validatePrice();

			if(this.product.product_type.error == '' && this.product.name.error == '' && this.product.description.error == '' &&
				this.product.supplier.error == '' && this.product.unit.error == '' && this.product.current_price.error == ''){

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

	        }

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




