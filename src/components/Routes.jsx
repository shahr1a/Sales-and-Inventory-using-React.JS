import React from "react"
import { Switch } from "react-router-dom"
import Dashboard from "../pages/Dashboard"
import Dealers from "../pages/Dealers"
import Inventory from "../pages/Inventory"
import ProductForm from "./product/ProductForm"
import Shop from "../pages/Shop"
import ProductPage from "../pages/ProductPage"
import CartPage from "../pages/CartPage"
import PrivateRoute from "./PrivateRoute"
import DealerForm from "./dealer/DealerForm"
import Category from "./category/Category"
import Profile from "../pages/Profile"
import Checkout from "../components/checkout/Checkout"
import Staff from "../pages/Staff"
import StaffForm from "./staff/StaffForm"
import Search from "../pages/Search"
import OrderList from "../pages/OrderList"

const Routes = () => (
    <Switch>
        {/* <Route path='/login' exact component={AccountBox} /> */}
        <PrivateRoute exact path="/Shop" component={Shop} />
        <PrivateRoute
            exact
            path="/productDetails/:id"
            component={ProductPage}
        />
        <PrivateRoute exact path="/cart/:id?" component={CartPage} />
        <PrivateRoute path="/" exact component={Dashboard} />
        <PrivateRoute exact path="/dealers" component={Dealers} />
        <PrivateRoute exact path="/products" component={Inventory} />
        <PrivateRoute exact path="/categories" component={Category} />
        <PrivateRoute exact path="/staff" component={Staff} />
        <PrivateRoute exact path="/dealerAdd/:id?" component={DealerForm} />
        <PrivateRoute exact path="/productAdd/:id?" component={ProductForm} />
        <PrivateRoute exact path="/staffAdd" component={StaffForm} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/checkout" component={Checkout} />
        <PrivateRoute exact path="/search" component={Search} />
        <PrivateRoute exact path="/orders" component={OrderList} />
    </Switch>
)

export default Routes
