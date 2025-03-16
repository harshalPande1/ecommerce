import React, { useState } from "react";
import { NavLink } from "react-router";
import { setShowModal } from "../../../features/Cart/Cart.js";
import { useDispatch, useSelector } from "react-redux";
import { useGetCategoriesQuery, useLazyGetCategoriesQuery, useLazyGetProductsQuery } from "../../../features/Products/productsApi.js";
import withAuth from "../../../features/Protected.jsx";
import { auth } from "../fireBase.js";

const Header = () => {
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const categories = useGetCategoriesQuery();
  const [getProductsByCat] = useLazyGetCategoriesQuery();
  const [getProducts] = useLazyGetProductsQuery();
  const { user } = useSelector(state => state.authSlice)

  const fetchProductsByCatogry = (categorie) => {
    try {
      getProductsByCat(categorie?.id)
    } catch (error) {
      console.log("error", error);

    }
  }

  const searchProductHandler = (e) => {
    try {
      e.preventDefault();
      getProducts({ title: `title=${search}` })
    } catch (error) {
      console.log("error", error);

    }
  }


  return <div className="m-2 shadow p-3 mb-5 bg-body-tertiary rounded">
    {/* <ul className="d-flex align-items-center">
        <NavLink className='mx-2 text-decoration-none text-dark ' to={'/jack'} ><strong>Jack Shop</strong></NavLink>
        <NavLink className='mx-2 text-decoration-none text-dark ' to={'/jack'} >layout</NavLink>
        <span className='mx-2 text-decoration-none text-dark  curso' onClick={()=>dispatch(setShowModal())} >cart</span>
        <NavLink className='mx-2 text-decoration-none text-dark ' to={'/login'} >login</NavLink>
        <NavLink className='mx-2 text-decoration-none text-dark ' to={'/register'} >register</NavLink>
    </ul> */}
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className='navbar-brand' to={'/'} >Jack Shop</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            <li className="nav-item">
              <span className='nav-link active' onClick={() => dispatch(setShowModal())} >Cart</span>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Category
              </a>
              <ul className="dropdown-menu">
                {
                  categories?.data?.map((categorie) => <li key={categorie?.id}><a className="dropdown-item" href="#" onClick={() => fetchProductsByCatogry(categorie)}>{categorie?.name}</a></li>)
                }
              </ul>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
            <button className="btn btn-outline-success" type="submit" onClick={searchProductHandler}>Search</button>
          </form>
        {!user?.payload?.uid &&  <div>
            <NavLink className='mx-2 text-decoration-none text-dark ' to={'/login'} >login</NavLink>
            <NavLink className='mx-2 text-decoration-none text-dark ' to={'/register'} >register</NavLink>
          </div>}
        {user?.payload?.uid &&  <div className="mx-2">
          <a className="dropdown-item" href="#" onClick={() => auth.signOut()}>Logout</a>
          </div>}
        </div>
      </div>
    </nav>
  </div>;
};

export default withAuth(Header);
