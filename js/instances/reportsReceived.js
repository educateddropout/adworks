


var sc = new Vue({

	el: '#reportsReceived',

	data: {
		
		pageCounter : 51,
		userData : {},
		
		receivedProducts : [],

		dateLabel : "",
		dateTo : "",
		dateFrom : ""
		
	},

	methods: {


		copyUserData(userData){

			this.userData = userData;

		},

		configDateLabel(dateLabel){

			this.dateLabel = dateLabel;
		},

		fetchReceivedProducts(date_from, date_to){

			this.dateFrom = date_from;
			this.dateTo = date_to;

			let self = this;
			axios.post('../php/api/fetchReceivedProducts.php',{

				date_from: date_from,
				date_to : date_to
				
            })
            .then(function (response){

                console.log(response.data);
                if(response.data.status == "SUCCESS"){

                    self.receivedProducts = response.data.message;                    
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




