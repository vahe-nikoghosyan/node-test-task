import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Link, withRouter, useHistory } from 'react-router-dom';
import { getUserProducts, setProduct } from "../store/actions/auth.action";

const MyProducts = ({ auth, getUserProducts, setProduct }) => {
    const history = useHistory();
    useEffect(() => {
        if (auth && auth.user && !auth.my_products) {
            getUserProducts(auth.user.id)
        }
    }, [auth, getUserProducts]);

    const handleSubmit = (event) => {
        console.log(auth, 'test')
        event.preventDefault();
        const { value: name } = event.target.name;
        const { value: description } = event.target.description;
        const { value: category } = event.target.category;
        const { value: price } = event.target.price;

        // dispatch action
        setProduct({ name, description, category, price, user_id: auth.user.id });
    }

    const { my_products, errors } = auth;
    return (
        <div className="my-products">
            {
                my_products && my_products.length ? (
                    <div className="products">
                        {
                            my_products.map(product => (
                                <div className="product">
                                    <p>{product.name}</p>
                                    <p>{product.description}</p>
                                    <div>
                                        <span>{product.category}</span>&nbsp;<span>${product.price}</span>
                                    </div>
                                    <hr/>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <div>No Data</div>
                )
            }
            <br/>
            <hr/>
            <br/>
            <h3>Create New Product</h3>
            <div style={{ color: 'red' }}>
                {errors}
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input name="name" placeholder="Product name"/>
                </div>
                <br/>
                <div>
                    <input name="description" placeholder="Product description"/>
                </div>
                <br/>
                <div>
                    <input name="category" placeholder="Product category"/>
                </div>
                <br/>

                <div>
                    <input name="price" placeholder="Product price" type="number"/>
                </div>

                <br/>
                <button>Submit</button>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(
    mapStateToProps,
    { getUserProducts, setProduct }
)(withRouter( MyProducts ));
