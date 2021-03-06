


var sc = new Vue({

	el: '#costSummary',

	data: {
		
		pageCounter : 54,
		userData : {},

		numberOfMonths : 6,
		kData : [0,0,0,0,0,0],
		mData : [0,0,0,0,0,0],
		lData : [0,0,0,0,0,0],
		eData : [0,0,0,0,0,0],
		total : [0,0,0,0,0,0]

		
	},

	mounted(){

		this.fetchCostSummary();

	},

	computed : {
		nMonth(){
			return lastNMonth(this.numberOfMonths-1);
		},

		totalKamuning(){
			return this.kData.reduce(function(a, b){	return Number(a)+Number(b)});
		},

		totalMakati(){
			return this.mData.reduce(function(a, b){	return Number(a)+Number(b)});
		},

		totalLab(){
			return this.lData.reduce(function(a, b){	return Number(a)+Number(b)});
		},

		totalEcodent(){
			return this.eData.reduce(function(a, b){	return Number(a)+Number(b)});
		},

		totalTotal(){
			return this.total.reduce(function(a, b){	return Number(a)+Number(b)});
		}

	},

	methods: {

		createChart(numberOfMonths, kData, mData, lData, eData){
			
			const ctx = document.getElementById('myChart').getContext('2d');
			const chart =  new Chart(ctx, {
			    // The type of chart we want to create
			    type: 'line',

			    // The data for our dataset
			    data: {
			        labels: this.nMonth,
			        datasets: [{
			            label: 'KAMUNING',
			            borderColor: 'rgb(255, 99, 132)',
			            data: kData
			        },{
			            label: 'MAKATI',
			            borderColor: 'rgb(100, 70, 21)',
			            data: mData
			        },{
			            label: 'DENTAL ARTS LABORATORY',
			            borderColor: 'rgb(0, 191, 255)',
			            data: lData
			        },{
			            label: 'ECODENT DENTAL SUPPLIES',
			            borderColor: 'rgb(150, 101, 230)',
			            data: eData
			        }]
			    },

			    // Configuration options go here
			    options: {}
			});

		},

		copyUserData(userData){

			this.userData = userData;

		},

		fetchCostSummary(){

			let self = this;
			axios.post('../php/api/costSummary.php',{
				numberOfMonths : this.numberOfMonths
            })
            .then(function (response){

                console.log(response.data);
                if(response.data.status == "SUCCESS"){
                    self.kData = response.data.message.kData;
                    self.mData = response.data.message.mData;
                    self.lData = response.data.message.lData;
                    self.eData = response.data.message.eData
                    self.total = response.data.message.total;
                    console.log(response.data.message.kData);
                    console.log(response.data.message.mData);
                    self.createChart(self.numberOfMonths, response.data.message.kData, response.data.message.mData, response.data.message.lData, response.data.message.eData);                  
                }
            })
            .catch(function (error) {
                console.log(error);
            });

		},

		convertMoney(n){

			return (Number(n)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

        },


	}

});

function lastNMonth(ctr){

	var retVal = [];
	var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	var today = new Date();
	var d;

	for(var i = ctr; i >= 0; i -= 1) {
	  d = new Date(today.getFullYear(), today.getMonth() - i, 1);
	  retVal.push(monthNames[d.getMonth()] + " " + d.getFullYear() );
	}

	return retVal;

}



