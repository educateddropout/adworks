Vue.component('filterExpired', {
	props: ['expiredStatus'],
	template: `
    
        <div>

		<div class="w3-row ">
            <button class="button" :class="{'is-link': isShowFilters}" @click="toggleShowFilters"><i class="fas fa-filter"></i> &nbsp Filter Records</button>
        </div>

        <div class="w3-row " v-show="isShowFilters">
            
            <div class="w3-col l9 w3-leftbar w3-border-blue  w3-pale-blue">
                
                <div class="w3-row w3-border-bottom w3-border-blue">
                    <div class="row w3-margin ">
                        <div class="columns">
                            <div class="column" v-for="pt in expiredStatusLib">
                                <div class="w3-row">
                                    <div class="w3-col l3">
                                        <input class="w3-check pointer" type="checkbox" :id="pt.description" :value="pt.value" v-model="expiredStatus.value" >
                                    </div>
                                    <div class="w3-col l9">
                                        <label class="pointer" :for="pt.description">{{pt.description}}</label>&nbsp&nbsp
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
            expiredStatusLib : expiredStatusLib(),

        }

    },

    methods : {


        toggleShowFilters(){

            if(this.isShowFilters == true) this.isShowFilters = false;
            else this.isShowFilters = true;

        }

    }


});