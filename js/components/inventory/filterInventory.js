Vue.component('filterInventory', {
	props: ['productTypes', 'stockTypes', 'supplierTypes', 'supplierLib','productTypeLib'],
	template: `
    
        <div>

		<div class="w3-row ">
            <button class="button" :class="{'is-link': isShowFilters}" @click="toggleShowFilters"><i class="fas fa-filter"></i> &nbsp Filter Records</button>
        </div>

        <div class="w3-row " v-show="isShowFilters">
            
            <div class="w3-col l9 w3-leftbar w3-border-blue  w3-pale-blue">
                
                <div class="w3-row w3-border-bottom w3-border-blue">
                    <div class="w3-row w3-margin ">
                        <div class="w3-third" v-for="pt in productTypeLib">
                            <div class="w3-row">
                                <div class="w3-col l3">
                                    <input class="w3-check pointer" type="checkbox" :id="pt.description" :value="pt.id" v-model="productTypes.value" >
                                </div>
                                <div class="w3-col l9">
                                    <label class="pointer" :for="pt.description">{{pt.description}}</label>&nbsp&nbsp
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div class="w3-row w3-border-bottom w3-border-blue">
                    <div class="w3-row w3-margin">
                        <div class="w3-quarter" v-for="s in supplierLib">
                            <div class="w3-row">
                                <div class="w3-col l3">
                                    <input class="w3-check pointer" type="checkbox" :id="s.supplier_name" :value="s.supplier_id" v-model="supplierTypes.value" >
                                </div>
                                <div class="w3-col l9">
                                    <label class="pointer" :for="s.supplier_name">{{s.supplier_name}}</label>&nbsp&nbsp
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                
                <div class="w3-row w3-bottombar w3-border-blue">
                    <div class="row w3-margin">
                        <div class="columns">
                            <div class="column" v-for="s in stockLib">
                                <div class="w3-row">
                                    <div class="w3-col l3">
                                        <input class="w3-check pointer" type="checkbox" :id="s.description" :value="s.value" v-model="stockTypes.value" >
                                    </div>
                                    <div class="w3-col l9">
                                        <label class="pointer" :for="s.description">{{s.description}}</label>&nbsp&nbsp
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

        </div>

	`,
    data() {

        return {

            isShowFilters : false,
            stockLib : stockLib(),

        }

    },

    methods : {


        toggleShowFilters(){

            if(this.isShowFilters == true) this.isShowFilters = false;
            else this.isShowFilters = true;

        }

    }


});