


var sc = new Vue({

    el: '#reportsReceived',

    data: {
        
        pageCounter : 53,
        userData : {},
        
        expiredProducts : [],

        dateLabel : "",
        dateTo : "",
        dateFrom : ""
        
    },

    mounted(){
        this.fetchExpiredProducts();
    },

    methods: {


        copyUserData(userData){

            this.userData = userData;

        },

        configDateLabel(dateLabel){

            this.dateLabel = dateLabel;
        },

        fetchExpiredProducts(){


            let self = this;
            axios.post('../php/api/fetchExpiredProducts.php',{
                
            })
            .then(function (response){

                console.log(response.data);
                if(response.data.status == "SUCCESS"){

                    self.expiredProducts = response.data.message;                    
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

        updateProductReceived(){

            this.fetchExpiredProducts();

        }

    }

});




