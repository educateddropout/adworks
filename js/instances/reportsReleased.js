


var sc = new Vue({

	el: '#reportsReleased',

	data: {
		
		pageCounter : 52,
		userData : {},
		
		releasedProducts : [],
		branchTypes : { 'value' : ["K","M"] },

		dateLabel : "",
		dateTo : "",
		dateFrom : "",
		searchInput : ""

		
	},

	computed: {

		filteredReleasedProducts(){

            return this.releasedProducts.filter(p => {

            	let searchHash = p.name;

                return this.branchTypes.value.includes(p.branch) &&
                	searchHash.toUpperCase().includes(this.searchInput.toUpperCase());

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

		convertMoney(n){

            let retVal = String(n).replace(/(.)(?=(\d{3})+$)/g,'$1,') + ".00";
            if(String(n).indexOf('.') !== -1) retVal = String(n).replace(/(.)(?=(\d{3})+$)/g,'$1,');

            return retVal;

        },

	}

});




