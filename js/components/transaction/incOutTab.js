Vue.component('incOutTab', {
	props: ['tabCounter'],
	template: `

		<div class="w3-row">
            <div class="tabs is-centered is-boxed is-medium">
                <ul>
                    <li :class="{'is-active': tabCounter == 31}">
                    <a href="transaction-incoming.html">
                        <span class="icon is-small"><i class="fas fa-indent" ></i></span>
                        <span><b>Incoming</b></span>
                    </a>
                    </li>
                    <li :class="{'is-active': tabCounter == 32}">
                        <a href="transaction-outgoing.html">
                            <span class="icon is-small"><i class="fas fa-outdent"></i></span>
                            <span><b>Outgoing</b></span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>

	`


});