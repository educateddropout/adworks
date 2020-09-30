


var sc = new Vue({

	el: '#dashboard',

	data: {
		
		pageCounter : 1,
		userData : {},

		lowStockProducts : [],
		transactions : []

		
	},

	mounted(){

		this.fetchLowStockProducts();
		this.fetchTransactions();

	},

	methods: {


		copyUserData(userData){

			this.userData = userData;

		},

		fetchLowStockProducts(){

			let self = this;
			axios.post('../php/api/fetchLowStockProducts.php',{
            })
            .then(function (response){

                console.log(response.data);
                if(response.data.status == "SUCCESS"){
                    self.lowStockProducts = response.data.message;                    
                }
            })
            .catch(function (error) {
                console.log(error);
            });

		},

		fetchTransactions(){

			let self = this;
			axios.post('../php/api/fetchTransactions.php',{
            })
            .then(function (response){

                console.log(response.data);
                if(response.data.status == "SUCCESS"){
                    self.transactions = response.data.message;                    
                }
            })
            .catch(function (error) {
                console.log(error);
            });

		},

		convertMoney(n){

            return (Number(n)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

        }

	}

});




