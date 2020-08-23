


var sc = new Vue({

	el: '#reportsReleased',

	data: {
		
		pageCounter : 52,
		userData : {},
		
		releasedProducts : [],
		branchTypes : { 'value' : ["K","M"] },

		dateLabel : "",
		dateTo : "",
		dateFrom : ""
		
	},

	computed: {

		filteredReleasedProducts(){

            return this.releasedProducts.filter(p => {

                return this.branchTypes.value.includes(p.branch);

            });
            
        },

    },

	methods: {


		copyUserData(userData){

			this.userData = userData;

		},

		configDateLabel(dateLabel){

			this.dateLabel = dateLabel;
		},

		fetchReleasedProducts(date_from, date_to){

			this.dateFrom = date_from;
			this.dateTo = date_to;

			let self = this;
			axios.post('../php/api/fetchReleasedProducts.php',{

				date_from: date_from,
				date_to : date_to
				
            })
            .then(function (response){

                console.log(response.data);
                if(response.data.status == "SUCCESS"){

                    self.releasedProducts = response.data.message;                    
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

		convertMoney(n){

            let retVal = String(n).replace(/(.)(?=(\d{3})+$)/g,'$1,') + ".00";
            if(String(n).indexOf('.') !== -1) retVal = String(n).replace(/(.)(?=(\d{3})+$)/g,'$1,');

            return retVal;

        },

	}

});




