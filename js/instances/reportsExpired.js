


var sc = new Vue({

    el: '#reportsReceived',

    data: {
        
        pageCounter : 53,
        userData : {},
        
        expiredProducts : [],

        expiredStatus : { 'value' : [2] } ,

        dateLabel : "",
        dateTo : "",
        dateFrom : "",

        sortedBy : 1,

        searchInput : ""
        
    },

    mounted(){

        this.fetchExpiredProducts();

        
    },

    computed : {

        filteredProducts(){

            return this.expiredProducts.filter(p => {
                let searchHash = p.name;
                return this.expiredStatus.value.includes(segregateExpiration(p.expiration_date, p.is_consumed)) &&
                        searchHash.toUpperCase().includes(this.searchInput.toUpperCase());

            });

            
        },

        sortedExpiredProducts(){
            
            let retVal = [];

            if(this.sortedBy == 1) retVal = _.orderBy(this.filteredProducts, ['expiration_date', 'name'], ['asc', 'asc'] );
            else if(this.sortedBy == 11) retVal = _.orderBy(this.filteredProducts, ['expiration_date', 'name'], ['desc', 'asc'] );

            return retVal;

        }

    },

    methods: {


        copyUserData(userData){

            this.userData = userData;

        },

        clickSort(index){

            if(this.sortedBy != index) this.sortedBy = index;
            else this.sortedBy = index + 10;

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

            return (Number(n)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

        },

        updateProductReceived(){

            this.fetchExpiredProducts();

        }

    }

});




