Vue.component('sideNav', {
	props: ['pageCounter','userData'],
	template: `
		
		<div class="sidenav w3-card has-background-white">
            <aside class="menu is-hidden-mobile">
                <div class="w3-row w3-container">
                    <p class="menu-label">
                        General
                    </p>
                    <ul class="menu-list">
                        <li><a :class="{'is-active' : pageCounter == 1}" href="dashboard.html"> <i class="fas fa-chart-line"></i> &nbsp Dashboard</a></li>
                        <li><a :class="{'is-active' : pageCounter == 2}" href="inventory.html"> <i class="fas fa-warehouse"></i> &nbsp Inventory</a></li>
                        <li>
                            <a :class="{'is-active' : pageCounter == 31 || pageCounter == 32}"><i class="fas fa-sign-language" ></i> &nbsp Transactions</a>
                            <ul>
                                <li><a :class="{'is-active' : pageCounter == 31}" href="transaction-incoming.html"><i class="fas fa-indent" ></i> &nbsp Incoming</a></li>
                                <li><a :class="{'is-active' : pageCounter == 32}" href="transaction-outgoing.html"><i class="fas fa-outdent"></i> &nbsp Outgoing</a></li>
                            </ul>
                        </li>
                        <li>
                            <a :class="{'is-active' : pageCounter == 51 || pageCounter == 52}"><i class="fas fa-archive"></i> &nbsp Reports</a>
                            <ul>
                                <li><a :class="{'is-active' : pageCounter == 51}" href="reports-received.html"><i class="fas fa-indent" ></i> &nbsp Received</a></li>
                                <li><a :class="{'is-active' : pageCounter == 52}" href="reports-released.html"><i class="fas fa-outdent" ></i> &nbsp Released</a></li>
                                <li><a :class="{'is-active' : pageCounter == 53}" href="reports-expired.html"><i class="fas fa-calendar-times"></i> &nbsp Products <br>&nbsp&nbsp&nbsp&nbsp&nbsp With<br>&nbsp&nbsp&nbsp&nbsp&nbsp  Expiration </a></li>
                                <li><a :class="{'is-active' : pageCounter == 54}" href="cost-summary.html"><i class="fas fa-dollar-sign"></i> &nbsp Cost <br>&nbsp&nbsp&nbsp&nbsp Summary</a></li>
                            </ul>
                        </li>
                    </ul>
                    <p class="menu-label">
                        Administration
                    </p>
                    <ul class="menu-list">
                        <li>
                            <a :class="{'is-active' : pageCounter == 41 || pageCounter == 42 || pageCounter == 43}"><i class="fas fa-cogs"></i> &nbsp Manage</a>
                            <ul>
                                <li><a  :class="{'is-active' : pageCounter == 41}" href="manage-products.html"> <i class="fas fa-boxes"></i> &nbsp Products</a></li>
                                <li><a  :class="{'is-active' : pageCounter == 42}" href="manage-supplier.html"> <i class="fas fa-truck-moving"></i> &nbsp Supplier</a></li>
                                <li><a  :class="{'is-active' : pageCounter == 44}" href="manage-product-type.html"> <i class="fas fa-box"></i> &nbsp Product <br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Type</a></li>
                                <li><a  :class="{'is-active' : pageCounter == 45}" href="manage-units.html"> <i class="fas fa-tape"></i> &nbsp Unit</a></li>
                                <li v-show="userData.userType == '3'"><a  :class="{'is-active' : pageCounter == 43}" href="manage-users.html"> <i class="fas fa-users"></i> &nbsp Users</a></li>
                                <br><br>
                            </ul>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>

	`,


});