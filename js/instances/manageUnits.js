


var sc = new Vue({

	el: '#manageUnits',

	data: {
		
		pageCounter : 44,
		userData : {},
		isOpenAddUnitsModal : false,
		units : { 
			id : { value : '', error : ''},
			description : { value : '', error : ''},
		},
		unitTypes : [],
		mMessage : "",
		mMessageType : "",
		isForAdding : true


		
	},

	mounted(){

		this.fetchUnits();
	},

	methods: {


		copyUserData(userData){

			this.userData = userData;

		},

		validateUnitsDescription(){

			this.units.description.error = validateName(this.units.description.value,true);

		},

		openUpdateUnitsModal(index){

			this.isOpenAddUnitsModal = true;
			this.isForAdding = false;

			this.units.id.value = this.unitTypes[index].id;
			this.units.description.value = this.unitTypes[index].description;

			
		},

		openAddUnitsModal(){

			this.isOpenAddUnitsModal = true;

		},

		closeAddUnitsModal(){

			this.isOpenAddUnitsModal = false;
			this.isForAdding = true;
			this.units.id.value = ""
			this.units.description.value = "";

			this.units.id.error = "";
			this.units.description.error = "";

		},

		saveUnits(){

			let self = this;

			this.validateUnitsDescription();

			if(this.units.description.error == ""){

				axios.post('../php/api/saveUnit.php',{
	            
	                units : this.units
	                
	            })
	            .then(function (response){

	                console.log(response.data);
	                if(response.data.status == "SUCCESS"){
	                    self.mMessage = "Successfully saved product type. Thank you!";
	                    self.mMessageType = "has-text-success";
	                } else {
	                    self.savingModalMessage = "Error in saving. Please contact your system administrator.";
	                    self.mMessageType = "has-text-danger";
	                }

	                self.closeAddUnitsModal();

	            })
	            .catch(function (error) {
	                console.log(error);
	            });

	        }

		},

		updateUnits(){

			let self = this;

			this.validateUnitsDescription();

			if(this.units.description.error == ''){

				axios.post('../php/api/updateUnit.php',{
	            
	                units : this.units
	                
	            })
	            .then(function (response){

	                console.log(response.data);
	                if(response.data.status == "SUCCESS"){
	                    self.mMessage = "Successfully updated product type. Thank you!";
	                    self.mMessageType = "has-text-success";
	                } else {
	                    self.savingModalMessage = "Error in saving. Please contact your system administrator.";
	                    self.mMessageType = "has-text-danger";
	                }

	                self.closeAddUnitsModal();

	            })
	            .catch(function (error) {
	                console.log(error);
	            });

	        }

		},

		archiveUnits(id){

			let self = this;

			axios.post('../php/api/archiveUnit.php',{
            
                units_id : id
                
            })
            .then(function (response){

                console.log(response.data);
                if(response.data.status == "SUCCESS"){
                    self.mMessage = "Successfully deleted product type. Thank you!";
                    self.mMessageType = "has-text-success";
                } else {
                    self.savingModalMessage = "Error in saving. Please contact your system administrator.";
                    self.mMessageType = "has-text-danger";
                }

                self.closeAddUnitsModal();

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
                    self.unitTypes = response.data.message;                    
                }
            })
            .catch(function (error) {
                console.log(error);
            });

		},

		closeMMessage(){
			this.mMessage = "";
			this.fetchUnits();
		}

	}

});




