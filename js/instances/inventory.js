


var sc = new Vue({

	el: '#inventory',

	data: {
		
		pageCounter : 2,
		userData : {},
		productLib : [],
		unitLib : libUnits(),
		

		productTypes : { 'value' : [1,2,3,4,5] } ,
		stockTypes : { 'value' : [1,2,3] },
        supplierTypes : { 'value' : [] },
        supplierLib : {},

		sortedBy : 2, // sorted by p type and name

		searchInput : ""


		
	},

	mounted(){

		this.fetchProducts();
        this.fetchSuppliers();
	},

	computed: {

		filteredProducts(){

            return this.productLib.filter(p => {

                let searchHash = p.name;

                return this.productTypes.value.includes(Number(p.product_type)) && 
                        this.supplierTypes.value.includes(p.supplier_id) &&
                		this.stockTypes.value.includes(segregateStocks(p.quantity)) &&
                		searchHash.toUpperCase().includes(this.searchInput.toUpperCase());

            });
            
        },

        sortedProducts(){
        	
        	let retVal = [];

        	if(this.sortedBy == 1) retVal = _.orderBy(this.filteredProducts, ['name'], ['asc'] );
        	else if(this.sortedBy == 2) retVal = _.orderBy(this.filteredProducts, ['product_description', 'name'], ['asc', 'asc'] );
        	else if(this.sortedBy == 11) retVal = _.orderBy(this.filteredProducts, ['name'], ['desc'] );
        	else if(this.sortedBy == 12) retVal = _.orderBy(this.filteredProducts, ['product_description', 'name'], ['desc', 'asc'] );

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

		searchProduct(){
			alert("ASDKL");
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

		convertMoney(n){

            let retVal = String(n).replace(/(.)(?=(\d{3})+$)/g,'$1,') + ".00";
            if(String(n).indexOf('.') !== -1) retVal = String(n).replace(/(.)(?=(\d{3})+$)/g,'$1,');

            return retVal;

        },

        printRecords(){

            var self = this;
            
            axios.post('../php/api/printInventoryRecords.php', {
                records : this.sortedProducts,
            })
            .then(function (response){

                console.log(response.data);
                window.open('../php/pdf/inventoryRecords.pdf','_newtab');

            })
            .catch(function (error) {
                alert(error);
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

                    response.data.message.forEach(function (s){
                        self.supplierTypes.value.push(s.supplier_id);
                    });
                }

            })
            .catch(function (error) {
                console.log(error);
            });

        },

	}

});




