


var sc = new Vue({

	el: '#manageSupplier',

	data: {
		
		pageCounter : 42,
		userData : {},
		isOpenAddSupplierModal : false,
		supplier : { 
			id : { value : '', error : ''},
			name : { value : '', error : ''},
			address : { value : '', error : ''},
			contactNumber : { value : '', error : ''},
			contactPerson : { value : '', error : ''},
			remarks : { value : '', error : ''}
		},
		supplierLib : [],
		mMessage : "",
		mMessageType : "",
		isForAdding : true


		
	},

	mounted(){

		this.fetchSuppliers();
	},

	methods: {


		copyUserData(userData){

			this.userData = userData;

		},

		openUpdateSupplierModal(index){

			this.isOpenAddSupplierModal = true;
			this.isForAdding = false;

			this.supplier.id.value = this.supplierLib[index].supplier_id;
			this.supplier.name.value = this.supplierLib[index].supplier_name;
			this.supplier.address.value = this.supplierLib[index].supplier_address;
			this.supplier.contactNumber.value = this.supplierLib[index].supplier_contact_number;
			this.supplier.contactPerson.value = this.supplierLib[index].supplier_contact_person;
			this.supplier.remarks.value = this.supplierLib[index].remarks;

			
		},

		openAddSupplierModal(){

			this.isOpenAddSupplierModal = true;

		},

		closeAddSupplierModal(){

			this.isOpenAddSupplierModal = false;
			this.isForAdding = true;
			this.supplier.id.value = ""
			this.supplier.name.value = "";
			this.supplier.address.value = "";
			this.supplier.contactNumber.value = "";
			this.supplier.contactPerson.value = "";
			this.supplier.remarks.value = "";

			this.supplier.name.error = "";
			this.supplier.address.error = "";
			this.supplier.contactNumber.error = "";
			this.supplier.contactPerson.error = "";
			this.supplier.remarks.error = "";

		},

		saveSupplier(){

			let self = this;

			axios.post('../php/api/saveSupplier.php',{
            
                supplier : this.supplier
                
            })
            .then(function (response){

                console.log(response.data);
                if(response.data.status == "SUCCESS"){
                    self.mMessage = "Successfully saved supplier details. Thank you!";
                    self.mMessageType = "has-text-success";
                } else {
                    self.savingModalMessage = "Error in saving. Please contact your system administrator.";
                    self.mMessageType = "has-text-danger";
                }

                self.closeAddSupplierModal();

            })
            .catch(function (error) {
                console.log(error);
            });

		},

		updateSupplier(){

			let self = this;

			axios.post('../php/api/updateSupplier.php',{
            
                supplier : this.supplier
                
            })
            .then(function (response){

                console.log(response.data);
                if(response.data.status == "SUCCESS"){
                    self.mMessage = "Successfully updated supplier details. Thank you!";
                    self.mMessageType = "has-text-success";
                } else {
                    self.savingModalMessage = "Error in saving. Please contact your system administrator.";
                    self.mMessageType = "has-text-danger";
                }

                self.closeAddSupplierModal();

            })
            .catch(function (error) {
                console.log(error);
            });

		},

		archiveSupplier(id){

			let self = this;

			axios.post('../php/api/archiveSupplier.php',{
            
                supplier_id : id
                
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

                self.closeAddSupplierModal();

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

		closeMMessage(){
			this.mMessage = "";
			this.fetchSuppliers();
		}

	}

});




