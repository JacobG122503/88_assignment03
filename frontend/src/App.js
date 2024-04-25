import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

function App() {
  const [viewer, setViewer] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {};

  function Create() {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container mt-5"
        id="paymentForm"
      >
        <div className="form-group">
          <p>ID</p>
          <input
            {...register("id", { required: true })}
            placeholder=""
            className="form-control"
            id="id"
          />
        </div>

        <div className="form-group">
          <p>Title</p>
          <input
            {...register("name", { required: true })}
            placeholder=""
            className="form-control"
          />
        </div>

        <div className="form-group">
          <p>Price</p>
          <input
            {...register("price", {
              required: true,
              minLength: 16,
              maxLength: 16,
            })}
            placeholder=""
            className="form-control"
          />
        </div>

        <div className="form-group">
          <p>Description</p>
          <input
            {...register("description", { required: true })}
            placeholder=""
            className="form-control"
          />
        </div>

        <div className="form-group">
          <p>Image URL</p>
          <input
            {...register("category")}
            placeholder=""
            className="form-control"
          />
        </div>

        <div className="form-group">
          <p>Category</p>
          <input
            {...register("category")}
            placeholder=""
            className="form-control"
          />
        </div>

        <div className="form-group">
          <p>Rating</p>
          <input
            {...register("rating", { required: true })}
            placeholder=""
            className="form-control"
          />
        </div>

        <br />
        <button type="submit" className="btn btn-secondary">
          Create Product
        </button>
        <br />
      </form>
    );
  }

  function Read() {

    const [myProducts, setMyProducts] = useState([]);

    useEffect(() => {
      fetch("http://localhost:8081/products")
      .then((response) => response.json())
      .then((products) => {
        setMyProducts(products);
      })
    }, []);

    const ShowProducts = () => {
      
      return (
        <div className="container mt-3">
          <div className="row">
            {myProducts.map(product => (
              <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div className="card">
                  <img src={product.image} className="card-img-top" alt={product.title} style={{objectFit:'cover', height:'20px'}} />
                  <div className = "card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text"><em>{product.category}</em> <br /> {product.description}</p>
                    <p className="card-text">{product.rating.rate}, {product.rating.count} reviews</p>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>
      )
    }

    return <div><ShowProducts /></div>;
  } // end of function

  function Update() {
    return <div>Update</div>;
  }

  function Delete() {
    return <div>Delete</div>;
  }

  const viewCreate = () => {
    setViewer(0);
  };

  const viewRead = () => {
    setViewer(1);
  };

  const viewUpdate = () => {
    setViewer(2);
  };

  const viewDelete = () => {
    setViewer(3);
  };

  return (
    <div>
      <header data-bs-theme="dark">
        <div class="navbar navbar-dark bg-dark shadow-sm">
          <div class="container">
            <button
              type="button"
              className="btn btn-primary"
              onClick={viewCreate}
            >
              Create
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={viewRead}
            >
              Read
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={viewUpdate}
            >
              Update
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={viewDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </header>
      {viewer === 0 && <Create />}
      {viewer === 1 && <Read />}
      {viewer === 2 && <Update />}
      {viewer == 3 && <Delete />}
    </div>
  );
}

export default App;
